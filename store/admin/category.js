//state
//digunakan untuk menyimpan data realtime umum digunakan untuk menyimpan data dari rest api
export const state = () => ({
  categories: [],
  page: 1,
  category: {}, //untuk menampung data category detail
});

//mutations
//digunakan untuk mengubah data dari state
export const mutations = {
  SET_CATEGORIES_DATA(state, payload) {
    state.categories = payload;
  },

  SET_PAGE(state, payload) {
    state.page = payload;
  },

  SET_CATEGORY_DATA(state, payload) {
    state.category = payload;
  },
};

//actions
//digunakan untuk melakukan request ke endpoint
export const actions = {
  getCategoriesData({ commit, state }, payload) {
    //serach
    let search = payload ? payload : "";

    //parameter q untuk pencarian data dan page dari state
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/admin/categories?q=${search}&page=${state.page}`)

        .then((response) => {
          //commit ke mutation
          commit("SET_CATEGORIES_DATA", response.data.data);
          resolve();
        });
    });
  },

  storeCategory({ dispatch, commit }, payload) {
    return new Promise((resolve, reject) => {
      //post data ke api
      this.$axios
        .post("/api/admin/categories", payload)
        //success
        .then(() => {
          dispatch("getCategoriesData");
          resolve();
        })
        //error
        .catch((error) => {
          reject(error);
        });
    });
  },

  getDetailCategory({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/admin/categories/${payload}`)

        //success
        .then((response) => {
          commit("SET_CATEGORY_DATA", response.data.data);

          //resolve promise
          resolve();
        });
    });
  },

  updateCategory({ dispatch, commit }, { categoryId, payload }) {
    //set promise
    return new Promise((resolve, reject) => {
      //store to Rest API "/api/admin/categories/:id" with method "POST"
      this.$axios
        .post(`/api/admin/categories/${categoryId}`, payload)

        //success
        .then(() => {
          //dispatch action "getCategoriesData"
          dispatch("getCategoriesData");

          //resolve promise
          resolve();
        })

        //error
        .catch((error) => {
          reject(error);
        });
    });
  },

  destroyCategory({dispatch, commit}, payload) {
    return new Promise((resolve, reject) => {
      //ke url delet category
      this.$axios.delete(`/api/admin/categories/${payload}`)

      .then(() => {
        dispatch('getCategoriesData')
        resolve()
      })
    })
  },

  //fungsi all data untuk ditaplikan pada halaman product
  getListAllData({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/api/web/categories')
      .then((response) => {
        commit('SET_CATEGORIES_DATA', response.data.data)
        resolve()
      })
    })
  }
};
