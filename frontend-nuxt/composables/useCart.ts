import type { Cart } from '~/types/medusa'

export const useCart = () => {
  const { medusa } = useMedusa()
  const cartStore = useCartStore()

  const CART_ID_KEY = 'medusa_cart_id'

  const getCartId = (): string | null => {
    if (import.meta.client) {
      return localStorage.getItem(CART_ID_KEY)
    }
    return null
  }

  const setCartId = (cartId: string) => {
    if (import.meta.client) {
      localStorage.setItem(CART_ID_KEY, cartId)
    }
  }

  const removeCartId = () => {
    if (import.meta.client) {
      localStorage.removeItem(CART_ID_KEY)
    }
  }

  const createCart = async (regionId?: string) => {
    try {
      const response = await medusa.carts.create({ region_id: regionId })
      const cart = response.cart as Cart
      setCartId(cart.id)
      cartStore.setCart(cart)
      return cart
    } catch (error) {
      console.error('Error creating cart:', error)
      throw error
    }
  }

  const getCart = async () => {
    const cartId = getCartId()
    if (!cartId) {
      return await createCart()
    }

    try {
      const response = await medusa.carts.retrieve(cartId)
      const cart = response.cart as Cart
      cartStore.setCart(cart)
      return cart
    } catch (error) {
      console.error('Error fetching cart:', error)
      removeCartId()
      return await createCart()
    }
  }

  const addItem = async (variantId: string, quantity: number = 1) => {
    try {
      const cart = await getCart()
      const response = await medusa.carts.lineItems.create(cart.id, {
        variant_id: variantId,
        quantity,
      })
      const updatedCart = response.cart as Cart
      cartStore.setCart(updatedCart)
      return updatedCart
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  const updateItem = async (lineItemId: string, quantity: number) => {
    try {
      const cart = await getCart()
      const response = await medusa.carts.lineItems.update(cart.id, lineItemId, {
        quantity,
      })
      const updatedCart = response.cart as Cart
      cartStore.setCart(updatedCart)
      return updatedCart
    } catch (error) {
      console.error('Error updating cart item:', error)
      throw error
    }
  }

  const removeItem = async (lineItemId: string) => {
    try {
      const cart = await getCart()
      const response = await medusa.carts.lineItems.delete(cart.id, lineItemId)
      const updatedCart = response.cart as Cart
      cartStore.setCart(updatedCart)
      return updatedCart
    } catch (error) {
      console.error('Error removing cart item:', error)
      throw error
    }
  }

  const clearCart = () => {
    removeCartId()
    cartStore.clearCart()
  }

  return {
    getCart,
    createCart,
    addItem,
    updateItem,
    removeItem,
    clearCart,
  }
}
