import type { Customer } from '~/types/medusa'

export const useAuth = () => {
  const { medusa } = useMedusa()
  const customer = useState<Customer | null>('customer', () => null)
  const isAuthenticated = computed(() => !!customer.value)

  const login = async (email: string, password: string) => {
    try {
      const response = await medusa.auth.authenticate({ email, password })
      customer.value = response.customer as Customer
      return customer.value
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (data: {
    email: string
    password: string
    first_name: string
    last_name: string
  }) => {
    try {
      const response = await medusa.customers.create(data)
      customer.value = response.customer as Customer
      return customer.value
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await medusa.auth.deleteSession()
      customer.value = null
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  const getCurrentCustomer = async () => {
    try {
      const response = await medusa.customers.retrieve()
      customer.value = response.customer as Customer
      return customer.value
    } catch (error) {
      customer.value = null
      return null
    }
  }

  const updateCustomer = async (data: Partial<Customer>) => {
    try {
      const response = await medusa.customers.update(data)
      customer.value = response.customer as Customer
      return customer.value
    } catch (error) {
      console.error('Update customer error:', error)
      throw error
    }
  }

  return {
    customer,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentCustomer,
    updateCustomer,
  }
}
