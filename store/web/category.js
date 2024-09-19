export const state = () => ({
  categories: [],
})

export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
      state.categories = payload
  },
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

}