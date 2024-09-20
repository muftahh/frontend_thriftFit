export const state = () => ({
  sliders: []
})

export const mutations = {
  SET_SLIDERS_DATA(state, payload) {
    state.sliders = payload
  },
}

export const actions = {
  getSlidersData({commit}) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/web/sliders')
      .then((response) => {
        commit('SET_SLIDERS_DATA', response.data.data)
        resolve()
      })
    })
  }
}