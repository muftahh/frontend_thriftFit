<template>
  <div class="container-fluid mt-custom">
    <div class="fade-in">
    <div class="row">
      <div class="col-md-3">
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded shadow-sm border-top-orange">
          <div class="card-body">
            <h5><i class="fa fa-shopping-cart"></i> MY ORDERS</h5>
            <hr>

            <div class="form-group">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="cari berdasarkan no. invoice">
                <div class="input-group-append">
                  <button class="btn btn-warning"><i class="fa fa-search"></i>
                    SEARCH
                  </button>
                </div>
              </div>
            </div>

            <b-table striped bordered hover :items="invoices.data" :fields="fields" show-empty>
              <template v-slot:cell(grand_total)="row">
                Rp. {{ formatPrice(row.item.grand_total) }}
              </template>
              <template v-slot:cell(statur)="row">
                <button v-if="row.item.statur == 'pending'" class="btn btn-sm btn-primary"> {{ row.item.statur }}</button>
                <button v-if="row.item.statur == 'success'" class="btn btn-sm btn-success"> {{ row.item.statur }}</button>
                <button v-if="row.item.statur == 'expired'" class="btn btn-sm btn-warning-2"> {{ row.item.statur }}</button>
                <button v-if="row.item.statur == 'failed'" class="btn btn-sm btn-danger"> {{ row.item.statur }}</button>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/web/sidebar.vue'

export default {
  middleware: 'isCustomer',

  layout: 'default',

  components: {
    Sidebar,
  },

  head() {
    return {
      title: 'Invoice - Customer'
    }
  },

  data() {
    return {
      fields: [
        {
          label: 'No. Invoice',
          key: 'invoice'
        },
        {
          label: 'Grand Total',
          key: 'grand_total'
        },
        {
          label: 'Status Payment',
          key: 'statur'
        },
        {
          label: 'Actions',
          key: 'actions',
          thClass: 'text-right',
          tdClass: 'text-right'
        }
      ]
    }
  },

  async asyncData({store}) {
    await store.dispatch('customer/invoice/getInvoicesData')
  },

  computed: {
    invoices() {
      return this.$store.state.customer.invoice.invoices
    }
  },
}
</script>

<style>

</style>