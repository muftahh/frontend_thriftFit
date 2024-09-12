//state
//digunakan untuk menyimpan data realtime umum digunakan untuk menyimpan data dari rest api
export const state = () => ({
  categories: [],
  page: 1,
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
};
