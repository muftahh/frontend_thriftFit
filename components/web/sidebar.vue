<template>
  <div class="card border-0 rounded shadow-lg custom-font" style="padding: 10px 7px;">
    <div class="card-body">
      <h5>MAIN MENU</h5>
      <hr>
      <ul class="list-group">
        <nuxt-link :to="{name: 'customer-dashboard'}"
          class="list-group-item text-decoration-none text-dark text-uppercase"> Dashboard
        </nuxt-link>

        <nuxt-link :to="{name: 'customer-invoices'}" class="list-group-item text-decoration-none text-dark text-uppercase">
           My Orders
        </nuxt-link>

        <a @click="logout" class="list-group-item text-decoration-none text-dark text-uppercase"
          style="cursor: pointer;"> Logout
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$store.commit('web/cart/SET_CARTS_DATA', [])
      this.$store.commit('web/cart/SET_CART_PRICE', 0)

      this.$router.push({
        name: 'customer-login'
      })
    }
  }
}
</script>

<style scoped>
a.nuxt-link-active {
  background: rgba(255, 222, 212, .05) !important;
}
</style>