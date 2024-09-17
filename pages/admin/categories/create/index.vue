<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-lg " style="padding: 10px 20px;">
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

                  <button class="btn btn-outline-success mr-1 btn-submit" type="submit">
                    <i class="fa fa-paper-plane"></i> SAVE
                  </button>
                  <button class="btn btn-outline-danger btn-reset" type="reset">
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
      title: "Add New Category - Administrator",
    };
  },

  //wadah untuk menampung data
  data() {
    return {
      category: {
        image: "",
        name: "",
      },
      validation: [],
    };
  },

  methods: {
    //handler file upload
    handleFileChange(e) {
      //get image
      let image = (this.category.image = e.target.files[0]);

      if (!image.type.match("image.*")) {
        e.target.value = "";

        this.category.image = null;

        //show sweet alert
        this.$swal.fire({
          title: "OOPS!",
          text: "Format File Tidak Didukung!",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    async storeCategory() {
      let formData = new FormData();

      formData.append("image", this.category.image);
      formData.append("name", this.category.name);

      //mengirim data ke storeCategory di folder store
      await this.$store
        .dispatch("admin/category/storeCategory", formData)

        .then(() => {
          this.$swal.fire({
            title: "BERHASIL!",
            text: "Data Berhasil Disimpan!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          //redirect ke halaman kategory
          this.$router.push({
            name: "admin-categories",
          });
        })

        .catch((error) => {
          this.validation = error.response.data;
        });
    },
  },
};
</script>

<style></style>
