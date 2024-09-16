export const state = () => ({
  customers: [],

  page: 1,
})

export const mutations = {
  SET_CUSTOMERS_DATA(state, payload) {
    state.customers = payload
  },

  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const actions = {
  getCustomersData({commit, state}, payload) {
    let search = payload ? payload : ''

    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/admin/customers?q=${search}&page=${state.page}`)
      .then((response) => {
        commit('SET_CUSTOMERS_DATA', response.data.data)
        resolve()
      })
    })
  },
}