import { defineStore } from 'pinia'
import type { Cart } from '~/types/medusa'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: null as Cart | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    itemCount: (state) => {
      if (!state.cart) return 0
      return state.cart.items?.reduce((total, item) => total + item.quantity, 0) || 0
    },

    subtotal: (state) => {
      if (!state.cart) return 0
      return state.cart.subtotal || 0
    },

    total: (state) => {
      if (!state.cart) return 0
      return state.cart.total || 0
    },

    items: (state) => {
      return state.cart?.items || []
    },
  },

  actions: {
    setCart(cart: Cart) {
      this.cart = cart
      this.error = null
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string) {
      this.error = error
    },

    clearCart() {
      this.cart = null
      this.error = null
    },
  },
})
