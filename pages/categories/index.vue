<template>
  <div class="container-fluid mt-custom-2">
    <div class="fade-in">
      <div class="row justify-content-center px-md-5">
          <div class="col-md-2 mb-3" v-for="category in categories" :key="category.id">
              <div class="card border-0 rounded shadow-sm">
                  <div class="card-body text-center">
                      <nuxt-link :to="{name: 'categories-slug', params: {slug: category.slug}}" class="custom-font">
                        <img :src="category.image" width="100" height="100">
                        <hr>
                        {{ category.name }}
                      </nuxt-link>
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
      title: 'Categories - ThriftFit',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: '11111111'
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
          content: 'descripton'
        }
      ]
    }
  },

  async asyncData({store}) {
    await store.dispatch('web/category/getCategoriesData')
  },

  computed: {
    categories() {
      return this.$store.state.web.category.categories
    }
  }
}
</script>

<style scoped>
.custom-font:hover {
  text-decoration: none;
  color: #509CDB;
}

</style>