const state = {
  data: {},
}

const mutations = {
  RECEIVE_STAFF (state, staff) {
     state.data = staff
  },
}

export default {
  state,
  mutations
}