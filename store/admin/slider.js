export const state = () => ({
  sliders: [],

  page: 1,
})

export const mutations = {
  SET_SLIDERS_DATA(state, payload) {
    state.sliders = payload
  },

  SET_PAGE(state, payload) {
    state.page = payload
  },
}

export const actions = {
  getSlidersData({commit, state}, payload) {
    let search = payload ? payload : ''
    
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/admin/sliders?q=${search}&page=${state.page}`)
      .then((response) => {
        commit('SET_SLIDERS_DATA', response.data.data)
        resolve()
      })
    })
  },

  storeSlider({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/admin/sliders', payload)
      .then(() => {
        dispatch('getSlidersData')
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  },

  destorySlider({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/api/admin/sliders/${payload}`)
      .then(() => {
        dispatch('getSlidersData')
        resolve()
      })
    })
  }
}
