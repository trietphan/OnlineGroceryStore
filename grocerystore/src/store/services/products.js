const state = {
  all: [],
}

const mutations = {
  RECEIVE_PRODUCTS (state, products) {
    state.all = products
  },

  ADD_TO_CART (state, productId) {
    state.all
      .find(product => product.id === productId)
      .stock--
  },

  REMOVE_FROM_CART (state, removedProduct) {
    state.all
      .find(product => product.id === removedProduct.id)
      .stock += removedProduct.quantity
  },

  EDIT_PRODUCT (state, editedProduct) {
    let product = state.all.find(product => product.id === editedProduct.id)
    product = editedProduct
  },

  ADD_PRODUCT (state, newProduct) {
    state.all = [...state.all, newProduct]
  },

  DELETE_PRODUCT (state, deletedProduct) {
    state.all.find(product => product.id === deletedProduct)
    
  }
}

export default {
  state,
  mutations
}