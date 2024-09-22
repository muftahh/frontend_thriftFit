export const state = () => ({
  products: [],

  page: 1
})

export const mutaions = {
  SET_PRODUCTS_DATA(state, payload) {
    state.products = payload
  },
  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const actions = {
  getProductsData({ commit, state }, payload) {
    let search = payload ? payload : ''
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/web/products?q=${search}&page=${state.page}`)
      .then((response) => {
          commit('SET_PRODUCTS_DATA', response.data.data)
          resolve()
      })
    })
  },
}