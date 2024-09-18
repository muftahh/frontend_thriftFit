<template>
  <ul class="c-sidebar-nav">
    <li class="c-sidebar-nav-item" style="margin-top: 10px;">
      <hr style="border-top: 3px solid #ffffff; border-radius: 0.5rem;">
      <nuxt-link
            :to="{ name: 'admin-dashboard' }"
            class="c-sidebar-nav-link"
            href="index.html"
          >
            <svg class="c-sidebar-nav-icon">
              <use
                xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-home"
              ></use>
            </svg>
            Dashboard</nuxt-link
          >
    </li>

    <li class="c-sidebar-nav-title">MASTER DATA</li>

    <li class="c-sidebar-nav-item">
      <nuxt-link :to="{ name: 'admin-categories' }" class="c-sidebar-nav-link">
        <svg class="c-sidebar-nav-icon">
          <use
            xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-folder"
          ></use>
        </svg>
        Categories</nuxt-link
      >
    </li>

    <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-products'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-layers"></use>
            </svg> Products
        </nuxt-link>
    </li>

    <li class="c-sidebar-nav-title">ORDERS</li>

    <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-invoices'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-cart"></use>
            </svg> Invoices
        </nuxt-link>
    </li>

    <li class="c-sidebar-nav-title">OTHERS</li>

    <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-customers'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-user"></use>
            </svg> Customers
        </nuxt-link>
    </li>

    <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-sliders'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-laptop"></use>
            </svg> Sliders
        </nuxt-link>
    </li>

    <li class="c-sidebar-nav-item">
        <nuxt-link :to="{name: 'admin-users'}" class="c-sidebar-nav-link">
            <svg class="c-sidebar-nav-icon">
                <use xlink:href="@/node_modules/@coreui/icons/sprites/free.svg#cil-group"></use>
            </svg> Users
        </nuxt-link>
    </li>

    <li class="c-sidebar-nav-divider"></li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
a.nuxt-link-active {
  background: rgba(80, 156, 189);
}

.c-sidebar-nav {
  background: #152259;
  padding: 15px; 
}
</style>
