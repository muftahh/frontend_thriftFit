<template>
  <header class="section-header fixed-top custom-font">
    <section class="header-main">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-3 col-sm-4 col-md-4 col-5"> 
              <nuxt-link to="/" class="brand-wrap" data-abc="true">
                <span class="logo p-2" >Thirft <i>Fit</i></span>
              </nuxt-link>
          </div>
          <div class="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
            <div class="search-wrap">
              <div class="input-group w-100"> 
                <input type="text" class="form-control search-form" v-model="search" @keypress.enter="searchData" style="width:55%;" placeholder="mau belanja apa hari ini ?">
                <div class="input-group-append"> 
                  <button @click="searchData" class="btn btn-primary search-button"> <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #152259;" /> </button> 
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-xl-4 col-sm-8 col-md-4 col-7">
            <div class="d-flex justify-content-end">
              <nuxt-link :to="{name: 'cart'}" class="btn search-button btn-md d-md-block ml-4 custom-text1"> 
                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                <span class="ml-2">{{ cartTotal }}
                </span> | Rp. {{ formatPrice(cartPrice) }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <nav class="navbar navbar-expand-md navbar-main border-bottom p-2">
      <div class="container-fluid">
        <div class="d-md-none">
          <div class="input-group"> 
            <input type="search" name="search" class="form-control" placeholder="mau belanja apa hari ini ?">
            <div class="input-group-append"> 
              <button class="btn btn-warning"> <i class="fa fa-search"></i></button> 
            </div>
          </div>
        </div> 
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#dropdown6"
          aria-expanded="false"> <span class="navbar-toggler-icon"></span> </button>
        <div class="navbar-collapse collapse" id="dropdown6">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle nav-custom" href="#" data-toggle="dropdown"
                data-abc="true" aria-expanded="false"><i class="fa fa-list-ul"></i> KATEGORI </a>
              <div class="dropdown-menu">
                <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}" class="dropdown-item" v-for="category in categories" :key="category.id">
                  <img width="0"> {{ category.name }}
                </nuxt-link>
                <div class="dropdown-divider"></div>
                <nuxt-link :to="{name: 'categories'}" class="dropdown-item active text-center" href="" data-abc="true">
                  LIHAT SEMUA KATEGORI <i class="fa fa-long-arrow-alt-right"></i>
                </nuxt-link>
              </div>
            </li>
            <li class="nav-item" > <nuxt-link :to="{name: 'products'}" class="nav-link nav-custom" data-abc="true"><i class="fa fa-shopping-bag"></i> SEMUA PRODUK</nuxt-link> </li>
            <li class="nav-item" > <a href="#" class="nav-link navbar-main-text nav-custom nav-web-link" data-abc="true"><i class="fa fa-info-circle"></i> TENTANG</a> </li>
            <li class="nav-item" > <a href="#" class="nav-link navbar-main-text nav-custom nav-web-link" data-abc="true"><i class="fa fa-comments"></i> KONTAK</a> </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" v-if="!$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-login'}" class="nav-link nav-custom" href="#" role="button" aria-expanded="false"> <i class="fa fa-user-circle"></i>
                ACCOUNT</nuxt-link>
            </li>
            <li class="nav-item dropdown" v-if="$auth.loggedIn">
              <nuxt-link :to="{name: 'customer-dashboard'}" class="nav-link nav-custom" href="#" role="button" aria-expanded="false"> <i class="fa fa-tachometer-alt"></i>
                DASHBOARD</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('web/category/getCategoriesData')

    if (this.$auth.loggedIn && this.$auth.strategy.name == 'customer') {

      await this.$store.dispatch('web/cart/getCartsData')
      await this.$store.dispatch('web/cart/getCartPrice')
    }
  },

  computed: {
    categories() {
      return this.$store.state.web.category.categories
    },

    cartPrice() {
      return this.$store.state.web.cart.cartPrice
    },

    cartTotal() {
      return this.$store.state.web.cart.carts.length
    }
  },

  data() {
    return {
      search: ''
    }
  },

  methods: {
    searchData() {
      this.$router.push({
        name: 'search',
        query: {
          q: this.search
        }
      });
    }
  }
}
</script>

<style scoped>
.btn {
  font-size: initial;
}
.header-main, .navbar-main, .nav-custom {
  background: #152259;
}
.custom-text1 {
  color: black;
}

.nav-link {
  color: white;
  border-radius: 15px; 
  padding: 10px 0px;
  margin-bottom: 10px; 
  transition: background-color 0.3s ease; 
}
.nav-custom:hover {
  color: rgb(80, 156, 189);
}
 
</style>