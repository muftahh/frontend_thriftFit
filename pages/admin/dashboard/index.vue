<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-6 col-lg-3">
            <div class="card border-9 rounded shadow-lg overflow-hidden custom-height">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-primary py-4 px-5 mfe-3 custom-height">
                  <i class="fas fa-circle-notch fa-spin fa-2x "></i>
                </div>
                <div>
                  <div class="text-value text-primary large">
                    {{ statistic.pending }}
                  </div>
                  <div class="text-muted text-uppercase font-weight-bold large">
                    PENDING
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-9 rounded shadow-lg overflow-hidden custom-height">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-success py-4 px-5 mfe-3 custom-height">
                  <i class="fas fa-check-circle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-success large">
                    {{ statistic.success }}
                  </div>
                  <div class="text-muted text-uppercase font-weight-bold large">
                    SUCCESS
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-9 rounded shadow-lg overflow-hidden custom-height">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-warning py-4 px-5 mfe-3 custom-height">
                  <i class="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-warning large">
                    {{ statistic.expired }}
                  </div>
                  <div class="text-muted text-uppercase font-weight-bold large">
                    EXPIRED
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-6 col-lg-3">
            <div class="card border-9 rounded shadow-lg overflow-hidden custom-height">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="bg-danger py-4 px-5 mfe-3 custom-height">
                  <i class="fas fa-times-circle fa-2x"></i>
                </div>
                <div>
                  <div class="text-value text-danger large">
                    {{ statistic.failed }}
                  </div>
                  <div class="text-muted text-uppercase font-weight-bold large">
                    FAILED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card border-9 rounded shadow-lg border-top-dark">
              <div class="card-header">
                <span class="font-weight-bold"
                  ><i class="fa fa-chart-bar"></i> GRAFIK PENDAPATAN
                  {{ new Date().getFullYear() }}</span
                >
              </div>
              <div class="card-body">
                <client-only>
                  <line-chart :data="chart.chartData"></line-chart>
                </client-only>
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
  //layout
  layout: "admin",

  //meta
  head() {
    return {
      title: "Dashboard - Administrator",
    };
  },

  async asyncData({ $axios }) {
    //fetching dashboard
    const dashboard = await $axios.$get("/api/admin/dashboard");

    //statistic
    const statistic = {
      pending: dashboard.data.count.pending,
      success: dashboard.data.count.success,
      expired: dashboard.data.count.expired,
      failed: dashboard.data.count.failed,
    };

    //cart
    const chart = {
      chartData: {
        labels: dashboard.data.chart.month_name,
        datasets: [
          {
            label: `STATISTIK PENDAPATAN : ${new Date().getFullYear()}`,
            backgroundColor: "#bccad8",
            data: dashboard.data.chart.grand_total,
          },
        ],
      },
    };

    return {
      statistic,
      chart,
    };
  },
};
</script>

<style scoped>
.custom-height {
    height: 100px;
  }
</style>
