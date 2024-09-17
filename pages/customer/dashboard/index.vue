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
        <div class="card border-0 rounded shadow-sm " style="padding: 10px 20px;">
          <div class="card-body">
            <h5><i class="fa fa-tachometer-alt"></i><Strong>DASHBOARD</Strong></h5>
            <hr>

            <div class="row">
              <div class="col-md-12">
                <div class="alert alert-success" role="alert">
                  Selamat Datang <strong>{{ $auth.user.name }}</strong>
                </div>
              </div>
            </div>

            <div class="row">

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden custom-height">
                  <div class="card-body customcard-body p-0 d-flex align-items-center">
                    <div class="custom-icon-container">
                      <svg class="icon-svg">
                        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-clock"></use>
                      </svg>
                    </div>
                    <div class="text-container">
                      <div class="text-value text-primary">{{ pending }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">PENDING</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden custom-height">
                  <div class="card-body customcard-body p-0 d-flex align-items-center">
                    <div class="custom-icon-container">
                      <svg class="icon-svg">
                        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-check-circle"></use>
                      </svg>
                    </div>
                    <div class="text-container">
                      <div class="text-value text-primary">{{ success }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">SUCCESS</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden custom-height">
                  <div class="card-body customcard-body p-0 d-flex align-items-center">
                    <div class="custom-icon-container">
                      <svg class="icon-svg">
                        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-sync"></use>
                      </svg>
                    </div>
                    <div class="text-container">
                      <div class="text-value text-primary">{{ expired }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">EXPIRED</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 col-lg-3">
                <div class="card rounded shadow-sm overflow-hidden custom-height">
                  <div class="card-body customcard-body p-0 d-flex align-items-center">
                    <div class="custom-icon-container">
                      <svg class="icon-svg">
                        <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-x-circle"></use>
                      </svg>
                    </div>
                    <div class="text-container">
                      <div class="text-value text-primary">{{ failed }}</div>
                      <div class="text-muted text-uppercase font-weight-bold small">FAILED</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
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
      Sidebar
    },

    //meta
    head() {
      return {
        title: 'Dashboard - Customer',
      }
    },

    async asyncData({ $axios }) {
      const dashboard = await $axios.$get('/api/customer/dashboard')

      return {
        'pending': dashboard.data.count.pending,
        'success': dashboard.data.count.success,
        'expired': dashboard.data.count.expired,
        'failed': dashboard.data.count.failed,
      }
    },

  }
</script>

<style scoped>
.custom-height {
    height: 90px;
}
.custom-icon-container {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0 10px; 
}
.icon-svg {
  width: 65px; 
  height: 45px;
}
.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.customcard-body {
  display: flex;
  align-items: center;
}
</style>