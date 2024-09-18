<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card rounded shadow-lg card-custom-main">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-folder"></i> CATEGORIES</span
                >
              </div>
              <div class="card-body">
                <div class="form-group" style="margin-bottom: 10px;">
                  <div class="input-group mb-3">

                    <div class="input-group-prepend">
                      <nuxt-link
                        :to="{ name: 'admin-categories-create' }"
                        class="btn btn-sm custom-btn-clr" style="padding-top: 10px;"
                      >
                        <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link
                      >
                    </div>

                    <input
                      type="text"
                      class="form-control shadow-none search-input-custom"
                      style="margin: 0px 8px; background-color: transparent;"
                      v-model="search"
                      @keypress.enter="searchData"
                      placeholder="cari berdasarkan nama category"
                    />

                    <div class="input-group-append">
                      <button @click="searchData" class="btn custom-btn-clr">
                        <i class="fa fa-search"></i>SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table
                  striped
                  borderless
                  hover
                  :items="categories.data"
                  :fields="fields"
                  show-empty
                >
                  <template v-slot:cell(image)="data">
                    <img class="img-fluid" width="50" :src="data.item.image" />
                  </template>
                  <template v-slot:cell(actions)="row">
                    <b-button
                      :to="{
                        name: 'admin-categories-edit-id',
                        params: { id: row.item.id },
                      }"
                      variant="outline-success"
                      size="sm"
                    >
                      EDIT
                    </b-button>
                    <b-button variant="outline-danger" size="sm" @click="destroyCategory(row.item.id)">DELETE</b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination
                  align="right"
                  pills
                  :value="categories.current_page"
                  :total-rows="categories.total"
                  :per-page="categories.per_page"
                  @change="changePage"
                  class="custom-pagination"
                  aria-controls="my-table"
                ></b-pagination>
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

  data() {
    return {
      fields: [
        {
          label: "Image",
          key: "image",
        },
        {
          label: "Category Name",
          key: "name",
        },
        {
          label: "Actions",
          key: "actions",
          thClass: 'text-right',
          tdClass: "text-right",
        },
      ],
      search: "",
    };
  },

  async asyncData({ store }) {
    await store.dispatch("admin/category/getCategoriesData");
  },

  computed: {
    //memanggil data categories yang berada di /store/admin/category -> categories
    //lalu mengirimnya di
    // <b-table striped bordered hover :items="categories.data" :fields="fields" show-empty>
    categories() {
      return this.$store.state.admin.category.categories;
    },
  },
  methods: {
    
    //method untuk fungsi btn
    //<button  @click="searchData" class="btn btn-warning"><i class="fa fa-search"></i>SEARCH</button>
    searchData() {
      //commit to mutation "SET_PAGE"
      this.$store.commit("admin/category/SET_PAGE", 1);

      //dispatch on action "getCategoriesData"
      this.$store.dispatch("admin/category/getCategoriesData", this.search);
    },

    //method pagination
    //<b-pagination align="right" :value="categories.current_page" :total-rows="categories.total" :per-page="categories.per_page" @change="changePage" aria-controls="my-table"></b-pagination>
    changePage(page) {
      //commit to mutation "SET_PAGE"
      this.$store.commit("admin/category/SET_PAGE", page);

      //dispatch on action "getCategoriesData"
      this.$store.dispatch("admin/category/getCategoriesData", this.search);
    },

    destroyCategory(id) {
      this.$swal.fire({
        title: 'APAKAH ANDA YAKIN?',
        text: "Ingin Menghapus Data Ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Tidak',
      }).then((result) => {
        if(result.isConfirmed) {

          this.$store.dispatch('admin/category/destroyCategory', id)
          .then(() => {
            
  
            //refresh data
            this.$nuxt.refresh()
  
            this.$swal.fire({
              title: 'Berhasil',
              text: "Data Berhasil Dihapus",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,    
            })
          })
        }
      })
    }
  },
};
</script>

<style scoped>
/* .c-main {
  font-family: 'Kumbh Sans', sans-serif;
} */
</style>
