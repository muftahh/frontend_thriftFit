<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> ADD NEW CATEGORY</span
                >
              </div>
              <div class="card-body">
                <form @submit.prevent="storeCategory">
                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input
                      type="file"
                      @change="handleFileChange"
                      class="form-control"
                    />
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.image[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>NAMA CATEGORY</label>
                    <input
                      type="text"
                      v-model="category.name"
                      placeholder="Masukkan Nama Category"
                      class="form-control"
                    />
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{
                        validation.name[0]
                      }}</b-alert>
                    </div>
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> SAVE
                  </button>
                  <button class="btn btn-warning btn-reset" type="reset">
                    <i class="fa fa-redo"></i> RESET
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: "admin",

  head() {
    return {
      title: "Categories - Administrator",
    };
  },

  //data function
  data() {
    return {
      fields: [
        {
          label: "Image",
          key: "image",
          tdClass: "text-center",
        },
        {
          label: "Category Name",
          key: "name",
        },
        {
          label: "Action",
          key: "action",
        },
      ],
      search: "",
    };
  },

  async asyncData({ store }) {
    await store.dispatch("admin/category/getCategoriesData");
  },

  computed: {
    categories() {
      //memanggil data categories yang berada di /store/admin/category -> categories
      return this.$store.state.admin.category.categories;
      //lalu mengirimnya di
      // <b-table striped bordered hover :items="categories.data" :fields="fields" show-empty>
    },
  },
  methods: {
    //method untuk fungsi btn
    //<button  @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>SEARCH</button>
    searchData() {
      this.$store.commit("admin/category/SET_PAGE", 1);
      this.$store.dispatch("admin/category/getCategoriesData", this.search);
    },

    //method pagination
    //<b-pagination align="right" :value="categories.current_page" :total-rows="categories.total" :per-page="categories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
    changePage() {
      this.$store.commit("admin/category/SET_PAGE", page);
      this.$store.dispatch("admin/category/getCategoriesData", this.search);
    },
  },
};
</script>

<style></style>
