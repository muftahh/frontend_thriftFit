<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-lg " style="padding-top: 10px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-user"></i> CUSTOMERS</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan nama customer">
                    <div class="input-group-append">
                      <button @click="searchData" class="btn custom-btn-clr"><i class="fa fa-search"></i>
                        SEARCH
                      </button>
                    </div>
                  </div>
                </div>

                <b-table striped bordered hover :items="customers.data" :fields="fields" show-empty>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" :value="customers.current_page" :total-rows="customers.total"
                  :per-page="customers.per_page" @change="changePage" class="custom-pagination" aria-controls="my-table"></b-pagination>

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
        key: 'created_at'
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

<style>
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