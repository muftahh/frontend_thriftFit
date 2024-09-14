//menyimpan data dari response
export const state = () => ({
  //product
  products: [],

  page: 1,
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
}