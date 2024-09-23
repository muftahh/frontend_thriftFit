<template>
  <div class="container-fluid mt-custom-2">
    <div class="fade-in">
      <div class="row">
          <div class="col-md-12">
              <h5>CATEGORY : <strong>{{ category.name.toUpperCase() }}</strong></h5>
              <!-- Solid divider -->
              <hr class="solid">
          </div>
      </div>
      <div class="row">
          
          <div class="col-md-2 mt-1 mb-4" v-for="product in category.products" :key="product.id">
          <div class="card h-100 border-0 rounded shadow-sm">
            <div class="card-body">
              <div class="card-img-actions"> 
                <img :src="product.image" class="card-img img-fluid"> 
                </div>
            </div>
            <div class="card-body bg-light-custom text-center rounded-bottom">
              <div class="mb-2">
                <h6 class="font-weight-semibold mb-2"> 
                  <nuxt-link :to="{name: 'products-slug', params: {slug: product.slug}}" class="text-default mb-2" data-abc="true">{{ product.title }}</nuxt-link> 
                </h6> 
                <nuxt-link :to="{name: 'categories-slug', params: {slug: product.category.slug}}" class="text-muted" data-abc="true">{{ product.category.name }}</nuxt-link>
              </div>
              <h6 v-if="product.discount > 0" class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
              
              <h5 v-if="product.discount > 0" class="mb-0 font-weight-semibold mt-3 text-success">
                Rp. {{ formatPrice(calculateDiscount(product)) }}
              </h5>
              <h5 v-else class="mb-0 font-weight-semibold mt-5">
                Rp. {{ formatPrice(product.price) }}
              </h5>
              <hr>
                <client-only>
                  <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating> 
                  (<strong>{{ product.reviews_count }}</strong> ulasan)
                </client-only>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `Categories - ${this.category.name} - ThriftFit`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `Categories - ${this.category.name} - ThriftFit`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: `Categories - ${this.category.name} - ThriftFit`
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `Categories - ${this.category.image} - ThriftFit`
        },
        {
          hid: 'description',
          name: 'description',
          content: `Categories - ${this.category.name} - ThriftFit`
        }
      ]
    }
  },

  async asyncData({store, route}) {
    await store.dispatch('web/category/getDetailCategory', route.params.slug)
  },

  computed: {
    category() {
      return this.$store.state.web.category.category
    }
  }
}
</script>

<style>

</style>