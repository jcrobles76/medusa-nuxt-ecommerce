import type { Product, ProductFilters } from '~/types/medusa'

export const useProducts = () => {
  const { medusa } = useMedusa()

  const getProducts = async (filters: ProductFilters = {}) => {
    try {
      const response = await medusa.products.list(filters)
      return {
        products: response.products as Product[],
        count: response.count,
        limit: response.limit,
        offset: response.offset,
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  const getProduct = async (id: string) => {
    try {
      const response = await medusa.products.retrieve(id)
      return response.product as Product
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    }
  }

  const searchProducts = async (query: string, filters: ProductFilters = {}) => {
    try {
      const response = await medusa.products.list({
        q: query,
        ...filters,
      })
      return {
        products: response.products as Product[],
        count: response.count,
      }
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  }

  return {
    getProducts,
    getProduct,
    searchProducts,
  }
}
