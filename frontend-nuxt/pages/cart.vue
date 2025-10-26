<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="card flex gap-4"
        >
          <!-- Product Image -->
          <div class="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <img
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <Icon name="heroicons:photo" class="w-8 h-8 text-gray-400" />
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 mb-1">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ item.variant?.title }}</p>

            <div class="flex items-center gap-4">
              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <button
                  @click="handleUpdateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1 || loading"
                  class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <Icon name="heroicons:minus" class="w-4 h-4" />
                </button>
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                <button
                  @click="handleUpdateQuantity(item.id, item.quantity + 1)"
                  :disabled="loading"
                  class="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Icon name="heroicons:plus" class="w-4 h-4" />
                </button>
              </div>

              <!-- Price -->
              <div class="ml-auto text-right">
                <p class="font-bold text-primary-600">
                  {{ formatPrice(item.total || 0, cartStore.cart?.region?.currency_code || 'USD') }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ formatPrice(item.unit_price || 0, cartStore.cart?.region?.currency_code || 'USD') }} each
                </p>
              </div>
            </div>
          </div>

          <!-- Remove Button -->
          <button
            @click="handleRemoveItem(item.id)"
            :disabled="loading"
            class="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Icon name="heroicons:trash" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card sticky top-24">
          <h2 class="font-bold text-xl mb-6">Order Summary</h2>

          <div class="space-y-3 mb-6">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.subtotal, cartStore.cart?.region?.currency_code || 'USD') }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{{ cartStore.cart?.shipping_total ? formatPrice(cartStore.cart.shipping_total, cartStore.cart.region?.currency_code || 'USD') : 'Calculated at checkout' }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{{ cartStore.cart?.tax_total ? formatPrice(cartStore.cart.tax_total, cartStore.cart.region?.currency_code || 'USD') : 'Calculated at checkout' }}</span>
            </div>

            <div class="border-t pt-3">
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span class="text-primary-600">
                  {{ formatPrice(cartStore.total, cartStore.cart?.region?.currency_code || 'USD') }}
                </span>
              </div>
            </div>
          </div>

          <NuxtLink to="/checkout" class="btn btn-primary w-full mb-3">
            Proceed to Checkout
          </NuxtLink>

          <NuxtLink to="/products" class="btn btn-outline w-full">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-16">
      <Icon name="heroicons:shopping-cart" class="w-24 h-24 text-gray-400 mx-auto mb-4" />
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
      <p class="text-gray-600 mb-6">Add some products to get started!</p>
      <NuxtLink to="/products" class="btn btn-primary">
        Browse Products
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
const { updateItem, removeItem } = useCart()
const loading = ref(false)

const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
  if (quantity < 1) return

  loading.value = true
  try {
    await updateItem(lineItemId, quantity)
  } catch (error) {
    console.error('Error updating quantity:', error)
  } finally {
    loading.value = false
  }
}

const handleRemoveItem = async (lineItemId: string) => {
  loading.value = true
  try {
    await removeItem(lineItemId)
  } catch (error) {
    console.error('Error removing item:', error)
  } finally {
    loading.value = false
  }
}
</script>
