import api from '../../api/demo'

function normalizeObject(obj) {
  return Object.keys(obj).reduce((result, prop) => {
    const val = obj[prop]

    if (!val) {
      return result
    } else {
      if (isNaN(parseFloat(val))) {
        return { ...result, [prop]: val }
      } else {
        return { ...result, [prop]: parseFloat(val) }
      }
    }
  }, {})
}

export const getAllCustomers = ({ commit }) => {
  api.getAllCustomers().then(customers => {
    // console.log(JSON.parse(JSON.stringify(customers)))
    commit('RECEIVE_ALL_CUSTOMERS', customers)
  })
}

export const getCustomer = ({ commit }, customerId) => {
  // console.log(commit, customerId)
  api.getCustomer(customerId).then(customer => {
    // console.log(profile)
    commit('RECEIVE_CUSTOMER', customer)
  })
}

export const getAllStaff = ({ commit }) => {
  api.getAllStaff().then(allstaff => {
    commit('RECEIVE_ALL_STAFF', allstaff)
  })
}


export const getStaff = ({ commit }, staffId) => {
  api.getStaff(staffId).then(staff => {
    commit('RECEIVE_STAFF', staff)
  })
}

export const getProducts = ({ commit }) => {
  api.getProducts().then(products => {
    commit('RECEIVE_PRODUCTS', products)
  })
}

export const editProduct = ({ commit }, productId, editedProduct) => {
  api.editProduct(productId, editedProduct)
  commit('EDIT_PRODUCT', productId, editedProduct)
}

export const addToCart = ({ commit }, product) => {
  if (product.stock > 0) {
    commit('ADD_TO_CART', product.id)
  }
}

export const removeFromCart = ({ commit }, product) => {
  commit('REMOVE_FROM_CART', product)
}

export const addProduct = ({ commit }, productFormData) => {
  const newProduct = normalizeObject(productFormData)
  api.addProduct(newProduct).then(addedProduct => {
    commit('ADD_PRODUCT', addedProduct)
  })
}

export const getAllOrders = ({ commit }) => {
  api.getAllOrders().then(orders => {
    commit('RECEIVE_ORDERS', orders)
  })
}

export const editAddress = ({ commit }, addressId, editedAddress) => { 
  api.editAddress(addressId, editedAddress)
  commit('EDIT_ADDRESS', addressId, editedAddress)
}