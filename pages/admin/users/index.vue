<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card rounded shadow-lg " style="padding: 10px 20px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-users"></i> USERS</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <nuxt-link :to="{name: 'admin-users-create'}" class="btn custom-btn-clr btn-sm" style="padding-top: 10px;">
                            <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>
                        </div>
                        <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama user">
                        <div class="input-group-append">
                            <button @click="searchData" class="btn custom-btn-clr"><i class="fa fa-search"></i>
                            SEARCH
                            </button>
                        </div>
                    </div>
                </div>

                <b-table striped borderless hover :items="users.data" :fields="fields" show-empty style="margin: 18px 0px;">
                  <template v-slot:cell(image)="data">
                      <img class="img-fluid" width="50" :src="data.item.image" />
                  </template>
                  <template v-slot:cell(actions)="row">
                      <b-button :to="{name: 'admin-users-edit-id', params: {id: row.item.id}}" variant="outline-success" size="sm">
                          EDIT
                      </b-button>
                      <b-button variant="outline-danger" size="sm" @click="destroyUser(row.item.id)">DELETE</b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="users.current_page" :total-rows="users.total"
                  :per-page="users.per_page" @change="changePage" pills class="custom-pagination" aria-controls="my-table"></b-pagination>

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
      title: 'Users - Administrator'
    }
  },

  data() {
    return {
      fields: [
        {
          label: 'User Name',
          key: 'name'
        },
        {
          label: 'Email Address',
          key: 'email'
        },
        {
          label: 'Actions',
          key: 'actions',
          thClass: 'text-right',
          tdClass: 'text-right'
        }
      ],

      search: ''
    }
  },

  async asyncData({store}) {
    await store.dispatch('admin/user/getUsersData')
  },

  computed: {
    users() {
      return this.$store.state.admin.user.users
    }
  },

  methods: {
    searchData() {
      this.$store.commit('admin/user/SET_PAGE', 1)
      this.$store.dispatch('admin/user/getUsersData', this.search)
    },

    changePage(page) {
      this.$store.commit('admin/user/SET_PAGE', page)
      this.$store.dispatch('admin/user/getUsersData', this.search)
    },

    destroyUser(id) {
      this.$swal.fire({
        title: 'APAKAH ANDA YAKIN!?',
        text: "Ingin Menghapus Data Ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Tidak'
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('admin/user/destroyUser', id)
          .then(() => {
            this.$nuxt.refresh()

            this.$swal.fire({
              title: 'BERHASIL!',
              text: "Data Berhasil Dihapus",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
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
  background-color: #509CDB;
  color: white;
  border-radius: 8px;
}
.custom-btn-clr:hover {
  background-color: #152259;
  color: white;
}
.custom-pagination .page-item.active .page-link {
  background-color: #509CDB; 
  color: white;
  border: none;
}
</style>