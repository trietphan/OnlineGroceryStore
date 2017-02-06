import axios from 'axios'

const API_LINK = (extension) => `http://localhost:3003/api/${extension}`

export default {
  getAllCustomers() {
    return new Promise(resolve => {
      axios.get(API_LINK(`customers`))
        .then(res => resolve(res.data))
    })
  },

  getCustomer(id) {
    return new Promise(resolve => {
      const result = Promise.all([axios.get(API_LINK(`customers/${id}`)),
                                  axios.get(API_LINK(`orders/${id}`))])

      result.then(([customerRes, ordersRes]) => {
        const [customer, orders] = [customerRes.data, ordersRes.data]
        // console.log(JSON.parse(JSON.stringify([customer, orders])))
        resolve({ ...customer, orders })
      })
    })
  },

  getAllStaff() {
    return new Promise(resolve => {
      axios.get(API_LINK(`staff`))
        .then(res => resolve(res.data))
    })
  },

  getStaff(id) {
    return new Promise(resolve => {
      axios.get(API_LINK(`staff/${id}`))
        .then(res => resolve(res.data))
    })
  },

  getProducts() {
    return new Promise(resolve => {
      axios.get(API_LINK(`products`))
        .then(res => resolve(res.data))
    })
  },

  editProduct(editedProduct) {
    return new Promise(resolve => {
      axios.put(API_LINK(`products/${editedProduct.id}`), editedProduct)
        .then(res => resolve())
    })
  },

  editAddress(editedAddress) {
    console.log('Edited address from API', editedAddress)
    return new Promise(resolve => {
      axios.put(API_LINK(`addresses/${editedAddress.id}`), editedAddress)
        .then(res => resolve())
    })
  },

  getOrder(id) {
    return new Promise(resolve => {
      axios.get(API_LINK(`orders/${id}`))
        .then(res => resolve(res.data))
    })
  },

  addProduct(newProduct) {
    return new Promise(resolve => {
      axios.post(API_LINK(`products`), newProduct)
        .then(res => resolve({ ...newProduct, id: res.data.id }))
    })
  },

  getAllOrders() {
    return new Promise(resolve => {
      axios.get(API_LINK(`orders`))
        .then(res => resolve(res.data))
    })
  },
}
