const state = {
  allcus: [],
}

const mutations = {
  RECEIVE_ALL_CUSTOMERS (state, customers) {
    state.allcus = customers
  },
}

export default {
  state,
  mutations
}