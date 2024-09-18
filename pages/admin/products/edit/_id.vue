<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card rounded shadow-lg card-custom-main">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i> EDIT PRODUCT</span>
              </div>
              <div class="card-body">

                <form @submit.prevent="updateProduct">

                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input type="file" @change="handleFileChange" class="form-control shadow-none search-input-custom">
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>NAMA PRODUCT</label>
                        <input type="text" v-model="product.title" placeholder="Masukkan Nama Product"
                          class="form-control shadow-none search-input-custom">
                        <div v-if="validation.title" class="mt-2">
                          <b-alert show variant="danger">{{ validation.title[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>CATEGORY</label>
                        <select class="form-control shadow-none search-input-custom" v-model="product.category_id">
                          <option value="">-- select category --</option>
                          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                        </select>
                        <div v-if="validation.category_id" class="mt-2">
                          <b-alert show variant="danger">{{ validation.category_id[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>WEIGHT (Gram)</label>
                        <input type="number" v-model="product.weight" placeholder="Masukkan Berat Product (Gram)"
                          class="form-control shadow-none search-input-custom">
                        <div v-if="validation.weight" class="mt-2">
                          <b-alert show variant="danger">{{ validation.weight[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>STOCK</label>
                        <input type="number" v-model="product.stock" placeholder="Masukkan Stock Product"
                          class="form-control shadow-none search-input-custom">
                        <div v-if="validation.stock" class="mt-2">
                          <b-alert show variant="danger">{{ validation.stock[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>DESCRIPTION</label>
                    <client-only placeholder="loading...">
                      <ckeditor-nuxt v-model="product.description" :config="editorConfig" />
                    </client-only>
                    <div v-if="validation.description" class="mt-2">
                      <b-alert show variant="danger">{{ validation.description[0] }}</b-alert>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>PRICE</label>
                        <input type="number" v-model="product.price" placeholder="Masukkan Harga Product"
                          class="form-control shadow-none search-input-custom">
                        <div v-if="validation.price" class="mt-2">
                          <b-alert show variant="danger">{{ validation.price[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>DISCOUNT (%)</label>
                        <input type="number" v-model="product.discount" placeholder="Masukkan Discount Product (%)"
                          class="form-control shadow-none search-input-custom">
                        <div v-if="validation.discount" class="mt-2">
                          <b-alert show variant="danger">{{ validation.discount[0] }}</b-alert>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button class="btn btn-outline-success mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                    UPDATE</button>
                  <button class="btn btn-outline-danger btn-reset" type="reset"><i class="fa fa-redo"></i>
                    RESET</button>

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
  layout: 'admin',

  head() {
    return {
      title: 'Edit Produc - Administrator'
    }
  },

  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import ('@blowstack/ckeditor-nuxt')
      }
    }
  },

  data() {
    return {
      product: {
        image: '',
        title: '',
        category_id: '',
        description: '',
        weight: '',
        price: '',
        stock: '',
        discount: ''
      },
      validation: [],
      editorConfig: {
        removePlugins: ['Title'],
      }
    }
  },  

  async asyncData({store, route}) {
    await store.dispatch('admin/category/getListAllData')
    await store.dispatch('admin/product/getDetailProduct', route.params.id)
  },

  computed: {
    categories() {
      return this.$store.state.admin.category.categories
    }
  },

  mounted() {
    this.product.title = this.$store.state.admin.product.product.title
    this.product.category_id = this.$store.state.admin.product.product.category_id
    this.product.description = this.$store.state.admin.product.product.description
    this.product.weight = this.$store.state.admin.product.product.weight
    this.product.price = this.$store.state.admin.product.product.price
    this.product.stock = this.$store.state.admin.product.product.stock
    this.product.discount = this.$store.state.admin.product.product.discount
  },

  methods: {
    handleFileChange(e) {
      //get image
      let image = this.product.image = e.target.files[0]
      if (!image.type.match('image.*')) {
        e.target.value = ''
        this.product.image = null

        //alert
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format Tidak Didukung",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },

    async updateProduct() {
      let formData = new FormData();

      formData.append('image', this.product.image)
      formData.append('title', this.product.title)
      formData.append('category_id', this.product.category_id)
      formData.append('description', this.product.description)
      formData.append('weight', this.product.weight)
      formData.append('price', this.product.price)
      formData.append('stock', this.product.stock)
      formData.append('discount', this.product.discount)
      formData.append('_method', "PATCH")

      //mengirim data
      await this.$store.dispatch('admin/product/updateProduct', {
        productId: this.$route.params.id,
        payload: formData
      })
      .then(() => {
        this.$swal.fire({
          title: 'BERHASIL',
          text: "Data Berhasil Diupdate",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })

        //redirect
        this.$router.push({
          name: 'admin-products'
        })
      })
      .catch(error => {
        this.validation = error.response.data
      })
    }
  }
}
</script>

<style>
.ck-editor__editable {
  min-height: 200px;
}
</style>