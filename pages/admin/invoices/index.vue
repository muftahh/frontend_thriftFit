<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-md-12">
            <div class="card border-0 rounded shadow-lg " style="padding: 10px 20px;">
              <div class="card-header">
                <span class="font-weight-bold"><i class="fa fa-shopping-cart"></i> INVOICES</span>
              </div>
              <div class="card-body">

                <div class="form-group">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" v-model="search" @keypress.enter="searchData" placeholder="cari berdasarkan no. invoice">
                        <div class="input-group-append">
                            <button @click="searchData" class="btn custom-btn-clr"><i class="fa fa-search"></i>
                            SEARCH
                            </button>
                        </div>
                    </div>
                </div>

                <b-table striped borderless hover :items="invoices.data" :fields="fields" show-empty style="margin: 18px 0px;">
                  <template v-slot:cell(grand_total)="row">
                    Rp. {{ formatPrice(row.item.grand_total) }}
                  </template>
                  <template v-slot:cell(statur)="row">
                    <button v-if="row.item.statur == 'pending'" class="btn btn-sm btn-primary"><i class="fa fa-circle-notch fa-spin"></i> {{ row.item.statur }}</button>
                    <button v-if="row.item.statur == 'success'" class="btn btn-sm btn-success"><i class="fa fa-check-circle"></i> {{ row.item.statur }}</button>
                    <button v-if="row.item.statur == 'expired'" class="btn btn-sm btn-warning-2"><i class="fa fa-exclamation-triangle"></i> {{ row.item.statur }}</button>
                    <button v-if="row.item.statur == 'failed'" class="btn btn-sm btn-danger"><i class="fa fa-times-circle"></i> {{ row.item.statur }}</button>
                  </template>
                  <template v-slot:cell(actions)="row">
                      <b-button :to="{name: 'admin-invoices-show-id', params: {id: row.item.id}}" variant="outline-success" size="sm">
                          DETAIL
                      </b-button>
                  </template>
                </b-table>

                <!-- pagination -->
                <b-pagination align="right" pills :value="invoices.current_page" :total-rows="invoices.total"
                  :per-page="invoices.per_page" @change="changePage" class="custom-pagination" aria-controls="my-table"></b-pagination>
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
      title: 'Invoices - Administrator'
    }
  },

  data() {
    return {
      fields: [
        {
          label: 'No. Invoives',
          key: 'invoice'
        },
        {
          label: 'Cutomer',
          key: 'customer_name'
        },
        {
          label: 'Grand Total',
          key: 'grand_total'
        },
        {
          label: 'Status Payment',
          key: 'statur',
        },
        {
          label: 'Actions',
          key: 'actions',
          thClass: 'text-right',
          tdClass: 'text-right'
        }
      ],

      serach: ''
    }
  },

  async asyncData({store}) {
    await store.dispatch('admin/invoice/getInvoicesData')
  },

  computed: {
    invoices() {
      return this.$store.state.admin.invoice.invoices
    },
  },

  methods: {
    searchData() {
      this.$store.commit('admin/invoice/SET_PAGE', 1)
      this.$store.dispatch('admin/invoice/getInvoicesData', this.search)
    },

    changePage(page) {
      this.$store.commit('admin/invoice/SET_PAGE', page)
      this.$store.dispatch('admin/invoice/getInvoicesData', this.search)
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