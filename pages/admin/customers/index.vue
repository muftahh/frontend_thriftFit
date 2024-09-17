<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card rounded shadow-lg " style="padding: 10px 20px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-user"></i> CUSTOMERS</span>
              </div>
              <div class="card-body">

                <div class="form-group" style="margin: 18px 0px;">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control shadow-none border-top-0 border-left-0 border-right-0" style="margin: 0px 8px; background-color: transparent;" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama customer">
                    <div class="input-group-append">
                      <button @click="searchData" class="btn custom-btn-clr"><i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table striped borderless hover :items="customers.data" :fields="fields" show-empty>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="customers.current_page" :total-rows="customers.total"
                  :per-page="customers.per_page" @change="changePage" pills class="custom-pagination" aria-controls="my-table"></b-pagination>

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
      title: 'Customers - Administrator'
    }
  },

  data() {
    return {
      fields: [
      {
        label: 'Customer Name',
        key: 'name'
      },
      {
        label: 'Email Address',
        key: 'email'
      },
      {
        label: 'Joined',
        key: 'created_at',
        tdClass: 'text-right',
        thClass: 'text-right'
      }
      ],

      search: ''
    }
  },

  async asyncData({store}) {
    await store.dispatch('admin/customer/getCustomersData')
  },

  computed: {
    customers() {
      return this.$store.state.admin.customer.customers
    },
  },

  methods: {
    searchData() {
      this.$store.commit('admin/customer/SET_PAGE', 1)
      this.$store.dispatch('admin/customer/getCustomersData', this.search)
    },

    changePage() {
      this.$store.commit('admin/customer/SET_PAGE', page)
      this.$store.dispatch('admin/customer/getCustomersData', this.search)
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