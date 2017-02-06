const state = {
  allsf: [],
}

const mutations = {
  RECEIVE_ALL_STAFF(state, allstaff) {
    state.allsf = allstaff
  },
}

export default {
  state,
  mutations
}