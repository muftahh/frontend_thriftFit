import Vue from "vue";

const mixin = {
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    calculateDiscount(product) {
      return product.price - (product.price * product.discount) / 100;
    },
  },
};
