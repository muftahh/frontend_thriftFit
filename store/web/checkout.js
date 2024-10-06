export const actions = {
    storeCheckout({ dispatch, commit }, payload) {

        return new Promise((resolve, reject) => {

            this.$axios.post('/api/web/checkout', payload)

            .then(response => {
                resolve(response.data.data)
                dispatch('web/cart/getCartsData', null, { root: true })

            })
            .catch(error => {
                reject(error)
            })

        })
    },
}