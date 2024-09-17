<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card rounded shadow-lg " style="padding: 10px 20px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-laptop"></i> SLIDERS</span>
              </div>
              <div class="card-body">

                <nuxt-link :to="{name: 'admin-sliders-create'}" class="btn custom-btn-clr btn-sm mb-3 p-2">
                    <i class="fa fa-plus-circle"></i> ADD NEW</nuxt-link>

                <b-table striped borderless hover :items="sliders.data" :fields="fields" show-empty style="margin: 18px 0px;">
                  <template v-slot:cell(image)="data">
                      <img class="img-fluid" width="200" :src="data.item.image" />
                  </template>
                  <template v-slot:cell(actions)="row">
                    <b-button variant="outline-danger" size="sm" @click="destroySlider(row.item.id)">DELETE</b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="sliders.current_page" :total-rows="sliders.total"
                  :per-page="sliders.per_page" @change="changePage" pills class="custom-pagination" aria-controls="my-table"></b-pagination>

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
      title: 'Sliders - Administrator'
    }
  },

  data() {
    return {
      fields: [
        {
          label: 'Image',
          key: 'image',
          tdClass: 'text-center'
        },
        {
          label: 'Link Slider',
          key: 'link'
        },
        {
          label: 'Actions',
          key: 'actions',
          thClass: 'text-right',
          tdClass: 'text-right'
        }
      ],
    }
  },

  async asyncData({store}) {
    await store.dispatch('admin/slider/getSlidersData')
  },

  computed: {
    sliders() {
      return this.$store.state.admin.slider.sliders
    },
  },

  methods: {
    changePage(page) {
      this.$store.commit('admin/slider/SET_PAGE', page)
      this.$store.dispatch('admin/slider/getSlidersData', this.search)
    },

    destroySlider(id) {
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
        //manggil fuungsi fuex
        this.$store.dispatch('admin/slider/destorySlider', id)
        .then(() => {
          this.$nuxt.refersh()
          this.$swal.fire({
              title: 'Berhasil',
              text: "Data Berhasil Dihapus",
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,    
            })
        })
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