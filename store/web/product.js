export const state = () => ({
  products: [],

  page: 1,

  product: {}
})

export const mutations = {
  SET_PRODUCTS_DATA(state, payload) {
      state.products = payload
  },

  SET_PAGE(state, payload) {
      state.page = payload
  },

  SET_PRODUCT_DATA(state, payload){
    state.product = payload
  }
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

  getDetailProduct({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/web/products/${payload}`)
      .then(response => {
        commit('SET_PRODUCT_DATA', response.data.data)
        resolve()
      })
    })
  }
}