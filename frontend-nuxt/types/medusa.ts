import type {
  StoreProduct,
  StoreCart,
  StoreCartLineItem,
  StoreCustomer,
  StoreRegion,
  StoreProductCategory
} from '@medusajs/types'

export type Product = StoreProduct
export type Cart = StoreCart
export type CartItem = StoreCartLineItem
export type Customer = StoreCustomer
export type Region = StoreRegion
export type Category = StoreProductCategory

export interface CartState {
  cart: Cart | null
  loading: boolean
  error: string | null
}

export interface ProductFilters {
  category_id?: string[]
  price_min?: number
  price_max?: number
  limit?: number
  offset?: number
  q?: string
}

export interface CheckoutData {
  email: string
  shipping_address: {
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    city: string
    country_code: string
    postal_code: string
    phone?: string
  }
  billing_address?: {
    first_name: string
    last_name: string
    address_1: string
    address_2?: string
    city: string
    country_code: string
    postal_code: string
    phone?: string
  }
}
