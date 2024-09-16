<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-sm border-top-orange">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-folder"></i> ADD NEW SLIDER</span>
              </div>
              <div class="card-body">

                <form @submit.prevent="storeSlider">

                  <div class="form-group">
                    <label>GAMBAR</label>
                    <input type="file" @change="handleFileChange" class="form-control">
                    <div v-if="validation.image" class="mt-2">
                      <b-alert show variant="danger">{{ validation.image[0] }}</b-alert>
                    </div>
                  </div>

                  <div class="form-group">
                    <label>LINK SLIDER</label>
                    <input type="text" v-model="slider.link" placeholder="Masukkan Link Slider" class="form-control">
                  </div>

                  <button class="btn btn-info mr-1 btn-submit" type="submit"><i class="fa fa-paper-plane"></i>
                    SAVE</button>
                  <button class="btn btn-warning btn-reset" type="reset"><i class="fa fa-redo"></i>
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
      title: 'Add New Slider - Administrator'
    }
  },

  data() {
    return {
      slider: {
        image: '',
        'link': ''
      },

      validation: []
    }
  },

  methods: {
    handleFileChange(e) {
      let image = this.slider.image = e.target.files[0]

      if(!image.type.match('image.*')) {
        e.target.value = ''

        this.slider.value = ''
        this.slider.image = null

        this.$swal.fire({
          title: 'OOPS!',
          text: "Format Tidak Didukung",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }
    },

    async storeSlider() {
      let formData = new FormData();

      formData.append('image', this.slider.image)
      formData.append('link', this.slider.link)

      await this.$store.dispatch('admin/slider/storeSlider', formData)
      .then(() => {
        this.$swal.fire({
          title: 'BERHASIL',
          text: "Data Berhasil Disimpan",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })

        this.$router.push({
          name: 'admin-sliders'
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

</style>