<template>
  <div class="container mt-custom mb-5 custom-font">
    <div class="fade-in">
      <div class="row">

        <div class="col-md-4 mb-4">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <img :src="product.image" class="w-100 rounded">
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h4>{{ product.title }}</h4>
              <hr>
              <h6 v-if="product.discount > 0" class="mb-0 font-weight-semibold"><s class="text-red">Rp. {{ formatPrice(product.price) }}</s> / <strong>{{ product.discount }} %</strong></h6>
              
              <h5 v-if="product.discount > 0" class="mb-0 font-weight-semibold mt-3 text-success">
                Rp. {{ formatPrice(calculateDiscount(product)) }}
              </h5>
              <h5 v-else class="font-weight-semibold mt-4 mb-sm-4">
                Rp. {{ formatPrice(product.price) }}
              </h5>

              <div class="mt-3">
                <div v-html="product.desc"></div>
              </div>
              <div class="table-responsive">
                <table class="table table-sm table-borderless mb-0">
                  <tbody>
                    <client-only>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>BERAT</strong></th>
                      <td><strong>: {{ product.weight }}</strong> gram</td>
                    </tr>
                    <tr>
                      <th class="pl-0 w-25" scope="row"><strong>STOK</strong></th>
                      <td><strong>: {{ product.stock }}</strong></td>
                    </tr>
                    </client-only>
                  </tbody>
                </table>
              </div>
              <hr>
              <button @click="addToCart(product.id, calculateDiscount(product), product.weight)" class="btn btn-lg custom-btn-clr border-0 shadow-sm"><i class="fa fa-shopping-cart"></i> TAMBAH KE
                KERANJANG</button>
            </div>
          </div>
        </div>

      </div>

      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow-sm">
            <div class="card-body">
              <h5><i class="fa fa-comments"></i> ULASAN PRODUK ( <strong>{{ product.reviews_count }}</strong> ulasan )</h5>
              <hr>
              <div class="card bg-light shadow-sm rounded" v-for="review in product.reviews" :key="review.id">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-1">
                      <div class="review-avatar avatar-sm">
                        <img :src="`https://ui-avatars.com/api/?name=${review.customer.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`">
                      </div>
                    </div>
                    <div class="col-md-11">
                      <client-only>
                        <vue-star-rating class="mb-2" :rating="review.rating" :star-size="20" :read-only="true" :show-rating="false">
                        </vue-star-rating>
                      </client-only>
                      <strong>
                        <span class="text-dark">{{ review.customer.name }}</span>
                      </strong>
                      <div class="description mt-2">
                        <span style="color: rgb(119, 118, 118);font-size:15px;font-style:italic">
                          {{ review.review }}
                        </span>
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
export default {
  head() {
    return {
      title: `${this.product.title}  - ThriftFit`,
        meta: [{
            hid: 'og:title',
            name: 'og:title',
            content: `${this.product.title}  - ThriftFit`,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: `${this.product.title}  - ThriftFit`,
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: this.product.image
          },
          {
            hid: 'description',
            name: 'description',
            content: `${this.product.title.substr(0, 30)}...`,
          },
        ]
    }
  },

  async asyncData({store, route}) {
    await store.dispatch('web/product/getDetailProduct', route.params.slug)
  },

  computed: {
    product() {
      return  this.$store.state.web.product.product
    }
  },

  methods: {
    async addToCart(productId, price, weight) {
      if (!this.$auth.loggedIn) {
        return this.$router.push({
          name: 'customer-login'
        })
      }

      if (this.$auth.strategy.name != "customer") {
        return this.$router.push({
          name: 'customer-login'
        })
      }

      await this.$store.dispatch('web/cart/storeCart', {
        product_id: productId,
        price: price,
        qty: 1,
        weight: weight
      })
      .then(() =>  {
        this.$swal.fire({
          title: 'BERHASIL!',
          text: "Product Berhasil Ditambahkan di Keranjang!",
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        })
      })
    }
  }
}
</script>

<style>

</style>