<template>
  <main class="c-main">
    <div class="container-fluid">
      <div class="fade-in">
        <div class="row">
          <div class="col-6 col-lg-3">
            <div class="card border-9 rounded shadow-lg overflow-hidden custom-height ">
              <div class="card-body p-0 d-flex align-items-center">
                <div class="custom-icon-container">
                  <svg class="icon-svg">
                    <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-clock"></use>
                  </svg>
                </div>
                <div class="text-container">
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
                <div class="custom-icon-container">
                  <svg class="icon-svg">
                    <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-check-circle"></use>
                  </svg>
                </div>
                <div class="text-container">
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
                <div class="custom-icon-container">
                  <svg class="icon-svg">
                    <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-sync"></use>
                  </svg>
                </div>
                <div class="text-container">
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
                <div class="custom-icon-container">
                  <svg class="icon-svg">
                    <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-x-circle"></use>
                  </svg>
                </div>
                <div class="text-container">
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
            <div class="card border-9 rounded shadow-lg border-top-dark" style="padding: 15px;">
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
.custom-icon-container {
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0 10px; 
}
.icon-svg {
  width: 70px; 
  height: 50px;
}
.text-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-body {
  display: flex;
  align-items: center;
}
</style>
