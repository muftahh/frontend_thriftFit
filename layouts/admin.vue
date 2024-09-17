<template>
  <div class="c-app">
    <div
      class="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show"
      id="sidebar"
    >
      <div class="c-sidebar-brand d-lg-down-none bgtempt" style="padding-top: 15px;">
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
        <div class="mr-auto" style="padding-left: 37px; margin-top: 30px; font-size: large;">
              <p v-if="$route.name === 'admin-dashboard'"> <i>Dashboard</i> </p>
              <p v-if="$route.name === 'admin-categories'"> <i>Categories</i> </p>
              <p v-if="$route.name === 'admin-categories-create'"> <i>Categories / Create</i> </p>
              <p v-if="$route.name === 'admin-categories-edit-id'"> <i>Categories / Edit</i> </p>
              <p v-if="$route.name === 'admin-products'"> <i>Products</i> </p>
              <p v-if="$route.name === 'admin-products-create'"> <i>Products / Create</i> </p>
              <p v-if="$route.name === 'admin-products-edit-id'"> <i>Products / Edit</i> </p>
              <p v-if="$route.name === 'admin-invoices'"> <i>Invoices</i> </p>
              <p v-if="$route.name === 'admin-invoices-show-id'"> <i>Invoices / Detail</i> </p>
              <p v-if="$route.name === 'admin-customers'"> <i>Customers</i> </p>
              <p v-if="$route.name === 'admin-sliders'"> <i>Sliders</i> </p>
              <p v-if="$route.name === 'admin-sliders-create'"> <i>Sliders / Create</i> </p>
              <p v-if="$route.name === 'admin-users'"> <i>Users</i> </p>
              <p v-if="$route.name === 'admin-users-create'"> <i>Users / Create</i> </p>
              <p v-if="$route.name === 'admin-users-edit-id'"> <i>Users / Edit</i> </p>
        </div>
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
  background: #152259;
}
.footer-custom-color {
  background-color: #d8dce4 !important;
}

.custom-font {
  font-size: x-large;
}
</style>
