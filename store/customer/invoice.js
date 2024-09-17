export const state = () => ({
  invoices: [],
  page: 1,
})

export const mutations = {
  SET_INVOICES_DATA(state, payload) {
    state.invoices = payload
  },

  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const actions = {
  getInvoicesData({commit, state}, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/customer/invoices?q=${search}&page=${state.page}`)
      .then((response) => {
        commit('SET_INVOICES_DATA', response.data.data)
        resolve()
      })

    })
  }
}