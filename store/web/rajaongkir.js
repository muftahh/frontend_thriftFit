export const state = () => ({
  provinces: [],
  cities: [],
  costs: []
})

export const mutations = {
  SET_PROVINCES_DATA(state, payload) {
    state.provinces = payload
  },

  SET_CITIES_DATA(state, payload) {
    state.cities = payload
  },

  SET_COSTS_DATA(state, payload) {
    state.costs = payload
  },
}

export const actions = {
  getProvincesData({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/web/pengiriman/provinces')
      .then((response) => {
        commit('SET_PROVINCES_DATA', response.data.data)
        resolve()
      })
    })
  },

  getCitiesData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/web/pengiriman/cities', payload)
      .then((response) => {
        commit('SET_CITIES_DATA', response.data.data)
        resolve()
      })
    })
  },

  getOngkirData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/web/pengiriman/ongkir', payload)
      .then((response) => {
        commit('SET_COSTS_DATA', response.data.data)
        resolve()
      })
    })
  }
}

