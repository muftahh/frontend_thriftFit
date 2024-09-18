export const actions = {
  storeReview({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('api/customer/reviews', payload)
      .then(response => {
        resolve(response.data)
      })
      .ctach(error => {
        reject(error)
      })
    })
  }
}