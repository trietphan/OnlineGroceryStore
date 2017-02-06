const state = {
  data: {
    id: null,
    name: '',
    balance: null,
    addresses: [],
    creditcards: [],
    orders: [],
  },
}

const mutations = {
  RECEIVE_CUSTOMER (state, customer) {
    state.data = customer
  },

  EDIT_ADDRESS (state, editedAddress) {
    let address = state.data.addresses.find(address => address.id === editedAddress.id)
    address = editedAddress
  }
}

export default {
  state,
  mutations
}
