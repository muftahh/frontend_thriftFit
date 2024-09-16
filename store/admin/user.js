export const state = () => ({
  users: [],

  page: 1,
})

export const mutations = {
  SET_USERS_DATA(state, payload) {
    state.users = payload
  },

  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const actions = {
  getUsersData({commit, state}, payload) {
    let search = payload ? payload : ''

    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/admin/users?q=${search}&page=${state.page}`)
      .then((response) => {
        commit('SET_USERS_DATA', response.data.data)
        resolve()
      })
    })
  },
}