import { defineStore } from 'pinia'
import type { Customer } from '~/types/medusa'

export const useUserStore = defineStore('user', {
  state: () => ({
    customer: null as Customer | null,
    isAuthenticated: false,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    fullName: (state) => {
      if (!state.customer) return ''
      return `${state.customer.first_name} ${state.customer.last_name}`
    },

    email: (state) => {
      return state.customer?.email || ''
    },
  },

  actions: {
    setCustomer(customer: Customer | null) {
      this.customer = customer
      this.isAuthenticated = !!customer
      this.error = null
    },

    setLoading(loading: boolean) {
      this.loading = loading
    },

    setError(error: string) {
      this.error = error
    },

    logout() {
      this.customer = null
      this.isAuthenticated = false
      this.error = null
    },
  },
})
