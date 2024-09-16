<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-lg " style="padding-top: 10px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-layer-group"></i> PRODUCTS</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <nuxt-link :to="{name: 'admin-products-create'}" class="btn custom-btn-clr btn-sm" style="padding-top: 10px;">
                            <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                        </div>
                        <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama product">
                        <div class="input-group-append">
                            <button @click="searchData" class="btn custom-btn-clr"><i class="fa fa-search"></i>
                                SEARCH
                            </button>
                        </div>
                    </div>
                </div>

                <b-table striped bordered hover :items="products.data" :fields="fields" show-empty>
                    <template v-slot:cell(actions)="row">
                        <b-button :to="{name: 'admin-products-edit-id', params: {id: row.item.id}}" variant="info" size="sm">
                            EDIT
                        </b-button>
                        <b-button variant="danger" size="sm" @click="destroyProduct(row.item.id)">DELETE</b-button>
                    </template>
                </b-table>
                
                <!-- pagination -->
                <b-pagination align="right" :value="products.current_page" :total-rows="products.total"
                  :per-page="products.per_page" @change="changePage" class="custom-pagination" aria-controls="my-table"></b-pagination>

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
  layout: 'admin',

  head() {
    return {
      title: 'Products - Administrator',
    }
  },

  data() {
    return {
      //untuk header dari table
      fields: [
        {
          label: 'Product Name',
          key: 'title',
        },
        {
          label: 'Category Name',
          key: 'category.name'
        },
        {
          label: 'Stock',
          key: 'stock',
          tdClass: 'text-center'
        },
        {
          label: 'Actions',
          key: 'actions',
          tdClass: 'text-center'
        }
      ],

      serach: '',
    }
  },

  async asyncData({store}) {
    await store.dispatch('admin/product/getProductsData')
  },

  computed: {
    products() {
      return this.$store.state.admin.product.products
    },
  },

  methods: {
    //method serach
    searchData() {
      this.$store.commit('admin/product/SET_PAGE', 1)
      this.$store.dispatch('admin/product/getProductsData', this.search)
    },

    changePage(page) {
      this.$store.commit('admin/product/SET_PAGE', page)
      this.$store.dispatch('admin/product/getProductsData', this.search)
    },

    // <b-button variant="danger" size="sm" @click="destroyProduct(row.item.id)">DELETE</b-button>
    destroyProduct(id) {
      this.$swal.fire({
        title: 'APAKAH ANDA YAKIN!?',
        text: "Ingin Menghapus Data Ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'YA, HAPUS!',
        cancelButtonText: 'TIDAK'
      }).then((result) => {
        if(result.isConfirmed) {
          this.$store.dispatch('admin/product/destroyProduct', id)
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

  }
}
</script>

<style scoped>
.custom-btn-clr {
  background-color: #7d818b;
  color: white;
}
.custom-pagination .page-item .page-link {
  background-color: white; 
  color: black; 
}
.custom-pagination .page-item.active .page-link {
  background-color: #7d818b; /* Warna background untuk page aktif */
  color: white;
}
</style>