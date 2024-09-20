<template>
  <div class="mt-custom mb-5">
    <div class="fade-in">
      <!-- slider -->
    <Slider />
    <!-- end slider -->
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
  }
}
</script>
