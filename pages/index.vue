<template>
  <div class="mr-custom mb-5">
    <div class="fade-in">

    <!-- slider -->
    <Slider />
    <!-- end slider -->

    <!-- product -->
    <div class="container-fluid mt-4 mb-5">
      <div class="mb-4">
        <h5 class="text-uppercase"><i class="fa fa-shopping-bag"></i> PRODUK TERBARU</h5>
        <!-- Solid divider -->
        <hr class="solid">
      </div>
      <div class="row">

        <div class="col-md-2 mt-1 mb-4" v-for="product in products.data" :key="product.id">
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
              
              <!-- <h6 v-if="product.discount > 0" class="mb-0 font-weight-semibold">
                <s class="text-red">Rp. {{ formatPrice(product.price) }}</s> / 
                <strong>{{ product.discount }} %</strong>
              </h6>

              <h5 v-if="product.discount > 0" class="mb-0 font-weight-semibold mt-3 text-success">
                Rp. {{ formatPrice(calculateDiscount(product)) }}
              </h5>
              <h5 v-else class="mb-0 font-weight-semibold mt-3">
                Rp. {{ formatPrice(product.price) }}
              </h5> -->
              
              <hr >
                <client-only>
                  <vue-star-rating :rating="parseFloat(product.reviews_avg_rating)" :increment="0.5" :star-size="20" :read-only="true" :show-rating="false" :inline="true"></vue-star-rating> 
                  (<strong>{{ product.reviews_count }}</strong> ulasan)
                </client-only>
            </div>
          </div>
        </div>

      </div>

      <div class="row justify-content-center mt-4">
          <div class="text-center">
            <nuxt-link :to="{name: 'products'}" class="btn btn-lg custom-btn-clr border-0 rounded shadow-sm">LIHAT LEBIH BANYAK</nuxt-link>
          </div>
        </div>

    </div>
    <!-- end product -->

    </div>
  </div>
</template>

<script>
import Slider from '@/components/web/slider.vue'
export default {
  components: {
    Slider
  },

  head() {
    return {
      title: 'ThriftFit - Ya Kali Nggak Ngetrif',

      //SEO WEBSITE
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: '1111111'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: '2222222'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: '/images/logo.png'
        },
        {
          hid: 'description',
          name: 'description',
          content: '4444444'
        }
      ]
    }
  },

  async asyncData({store}) {
    await store.dispatch('web/product/getProductsData')
  },

  computed: {
    products() {
      return this.$store.state.web.product.products
    }
  }
}
</script>
