<template>
  <div class="container mt-custom mb-3">
    <div class="fade-in">
    <div class="row justify-content-center">
      <div class="col-md-7">
        <div class="card-group" style="margin-top: 40px; ">
          <div class="card border-0 shadow-sm rounded" style="padding-top: 10px;">
            <div class="card-body">
              <h3>REGISTER</h3>
              <hr>
              <div v-if="validation.message" class="mt-2">
                <b-alert show variant="danger">{{ validation.message }}</b-alert>
              </div>
              <form @submit.prevent="register">

                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-user"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.name" type="text" placeholder="Nama Lengkap">
                    </div>
                    <div v-if="validation.name" class="mt-2">
                      <b-alert show variant="danger">{{ validation.name[0] }}</b-alert>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-envelope"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.email" type="email" placeholder="Email Address">
                    </div>
                    <div v-if="validation.email" class="mt-2">
                      <b-alert show variant="danger">{{ validation.email[0] }}</b-alert>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-lock"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.password" type="password" placeholder="Password">
                    </div>
                    <div v-if="validation.password" class="mt-2">
                      <b-alert show variant="danger">{{ validation.password[0] }}</b-alert>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-group mb-4">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="fa fa-lock"></i>
                        </span>
                      </div>
                      <input class="form-control" v-model="user.password_confirmation" type="password"
                        placeholder="Password Confirmation">
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <button class="btn btn-info shadow-sm rounded-sm px-4" type="submit">REGISTER</button>
                    <button class="btn btn-warning shadow-sm rounded-sm px-4" type="reset">RESET</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-3" style="margin-bottom: 40px; ">
      Sudah punya akun? <nuxt-link :to="{name: 'customer-login'}" class="font-weight-bold text-bottom"> Login Disini
      </nuxt-link>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  layout: 'default',

  head() {
    return {
      title: 'Register - Customer',
    }
  },

  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },

      validation: []
    }
  },

  methods: {
    //register
    async register() {
      await this.$store.dispatch('customer/customer/storeRegister', {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation
      })
      .then(() => {
        this.$swal.fire({
          title: 'Berhasil',
          text: "Akun Berhasil Didaftarkan",
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })

        this.$router.push({
          name: 'customer-login'
        })
      })
      .cathc(error => {
        this.validation = error.response.data
      })
    }
  }
}
</script>

<style>
.text-bottom:hover {
  color: rgb(33, 38, 49);
}
</style>