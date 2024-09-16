<template>
  <div class="c-app">
    <div
      class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show"
      id="sidebar"
    >
      <div class="c-sidebar-brand d-lg-down-none bgtempt">
        <span class="font-weight-bold custom-font">Thrift Fit</span>
      </div>

      <!-- sidebar -->
      <Sidebar />
      <!-- end sidebar -->
    </div>
    <div class="c-wrapper c-fixed-components">
      <!-- header -->
      <Header />
      <!-- end header -->

      <div class="c-body">
        <!-- content -->
        <Nuxt />
        <!-- end content -->

        <footer class="c-footer footer-custom-color">
          <div class="ml-auto" style="padding-right: 20px;"><strong>Thrift-Fit</strong> &copy; 2024 - by <i>ctrlss</i> </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/admin/header.vue";
import Sidebar from "@/components/admin/sidebar.vue";

export default {
  //middleware
  middleware: "isAdmin",

  //register components
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style scoped>
.bgtempt {
  background: rgb(33, 38, 49);
}
.footer-custom-color {
  background-color: #d8dce4 !important;
}

.custom-font {
  font-size: x-large;
}
</style>
