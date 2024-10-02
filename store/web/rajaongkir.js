// export const state = () => ({
//   provinces: [],
//   cities: [],
//   costs: [],
// })

// export const mutations = {
//   SET_PROVINCE_DATA(state, payload) {
//     state.provinces = payload
//   },

//   SET_CITIES_DATA(state, payload) {
//     state.cities = payload
//   },

//   SET_COSTS_DATA(state, payload) {
//     state.costs = payload
//   }
// }

// export const actions = {
//   getProvincesData({commit}) {
//     return new Promise((resolve, reject) => {
//       this.$axios.get('/api/web/pengiriman/provinces')
//       .then((response) => {
//         commit('SET_PROVINCE_DATA', response.data.data)
//         resolve()
//       })
//     })
//   },

//   getCitiesData({commit}, payload) {
//     return new Promise((resolve, reject) => {
//       this.$axios.post('/api/web/pengiriman/cities', payload)
//       .then((response) => {
//         commit('SET_CITIES_DATA', response.data.data)
//         resolve()
//       })
//     })
//   },

//   getOngkirData({commit}, payload) {
//     return new Promise((resolve, reject) => {
//       this.$axios.post('/api/web/pengiriman/ongkir', payload)
//       .then((response) => {
//         commit('SET_COSTS_DATA', response.data.data)
//         resolve()
//       })
//     })
//   }
// }

//state
export const state = () => ({

  //provinces
  provinces: [],

  //cities
  cities: [],

  //costs ongkir
  costs: []

})

//mutations
export const mutations = {

  //mutation "SET_PROVINCES_DATA"
  SET_PROVINCES_DATA(state, payload) {

      //set value state "provinces"
      state.provinces = payload
  },

  //mutation "SET_CITIES_DATA"
  SET_CITIES_DATA(state, payload) {

      //set value state "cities"
      state.cities = payload
  },

  //mutation "SET_COSTS_DATA"
  SET_COSTS_DATA(state, payload) {

      //set value state "costs"
      state.costs = payload
  },

}

//actions
export const actions = {

  //get provinces data
  getProvincesData({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/rajaongkir/provinces" with method "GET"
          this.$axios.get('/api/web/pengiriman/provinces')
          
          //success
          .then((response) => {

              //commit ti mutation "SET_PROVINCES_DATA"
              commit('SET_PROVINCES_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //get cities data
  getCitiesData({ commit }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/rajaongkir/cities" with method "POST"
          this.$axios.post('/api/web/pengiriman/cities', payload)
          
          //success
          .then((response) => {

              //commit ti mutation "SET_CITIES_DATA"
              commit('SET_CITIES_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //getOngkirData
  getOngkirData({ commit }, payload) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/rajaongkir/checkOngkir" with method "POST"
          this.$axios.post('/api/web/pengiriman/ongkir', payload)
          
          //success
          .then((response) => {

              //commit ti mutation "SET_COSTS_DATA"
              commit('SET_COSTS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })
  }

}

