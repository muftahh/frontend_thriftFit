//menyimpan data dari response
export const state = () => ({
  //product
  products: [],

  page: 1,

  product: {},
})

export const mutations = {
  //set data
  SET_PRODUCTS_DATA(state, payload) {
     state.products = payload
  },

  //set page
  SET_PAGE(state, payload) {
     state.page = payload
  },

  SET_PRODUCT_DATA(state, payload) {
    state.product = payload
  }
}

export const actions = {
  //get data
  getProductsData({commit, state}, payload) {
    //mencari data
    let search = payload ? payload : ''

    return new Promise((resolve, reject) => {
      //Tanda ampersand (&) digunakan untuk menggabungkan beberapa parameter query dalam satu URL.
      //Tanda tanya (?) di URL menunjukkan awal dari query string, yaitu bagian dari URL yang mengirim parameter ke server.
      this.$axios.get(`/api/admin/products?q=${search}&page=${state.page}`)
      .then((response) => {
        commit('SET_PRODUCTS_DATA', response.data.data)
        resolve()
      })
    })
  },

  //store data
  storeProduct({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/admin/products', payload)
      .then(() => {
        dispatch('getProductsData')
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    }) 
  },

  //getDetail
  getDetailProduct({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get(`/api/admin/products/${payload}`)
      .then(response => {
        //commit ke mutations diatas
        commit('SET_PRODUCT_DATA', response.data.data)
        resolve()
      })
    })
    
  },

  updateProduct({dispatch, commit}, {productId, payload}) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/api/admin/products/${productId}`, payload)
      .then(() => {
        //dispatch action ke getProductData
        dispatch('getProductsData')
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  },


}