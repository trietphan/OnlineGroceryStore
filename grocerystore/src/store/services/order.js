const state = {
  all: [],
}

const mutations = {
  RECEIVE_ORDERS (state, orders) {
    state.all = orders
  },

  EDIT_ORDER (state, newOrder) {

  },

  DELETE_ORDER (state, deletedOrder) {

  },
}

export default {
  state,
  mutations,
}
