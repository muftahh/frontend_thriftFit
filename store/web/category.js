export const state = () => ({
  categories: [],

  category: {}
})

export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
    state.categories = payload
  },

  SET_CATEGORY_DATA(state, payload) {
    state.category = payload
  }
}

export const actions = {
  getCategoriesData({ commit }) {
      return new Promise((resolve, reject) => {
          this.$axios.get('/api/web/categories')
          .then((response) => {
              commit('SET_CATEGORIES_DATA', response.data.data)
              resolve()
          })
      })
  },

  getDetailCategory({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/web/categories/${payload}`)
      .then(response => {
        commit('SET_CATEGORY_DATA', response.data.data)
        resolve()
      })
    })
  }
}