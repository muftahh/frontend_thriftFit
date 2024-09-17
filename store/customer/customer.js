export const actions = {
  storeRegister({commit}, payload) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/api/customer/register', payload)
      .then(() => {
        resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  }
}