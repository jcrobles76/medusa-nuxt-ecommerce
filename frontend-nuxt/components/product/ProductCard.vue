<template>
  <NuxtLink :to="`/products/${product.id}`" class="group">
    <div class="card hover:shadow-lg transition-shadow duration-200">
      <!-- Product Image -->
      <div class="aspect-square overflow-hidden rounded-lg mb-4 bg-gray-100">
        <img
          v-if="product.thumbnail"
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
          <Icon name="heroicons:photo" class="w-16 h-16" />
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ product.title }}
        </h3>

        <!-- Price -->
        <div class="flex items-center justify-between">
          <div v-if="lowestPrice">
            <span class="text-lg font-bold text-primary-600">
              {{ formatPrice(lowestPrice.amount, lowestPrice.currency_code) }}
            </span>
          </div>

          <!-- Add to Cart Button -->
          <button
            @click.prevent="handleAddToCart"
            class="btn btn-primary btn-sm"
            :disabled="loading"
          >
            <Icon v-if="!loading" name="heroicons:shopping-cart" class="w-4 h-4" />
            <Icon v-else name="heroicons:arrow-path" class="w-4 h-4 animate-spin" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Product } from '~/types/medusa'

const props = defineProps<{
  product: Product
}>()

const { addItem } = useCart()
const loading = ref(false)

const lowestPrice = computed(() => {
  if (!props.product.variants || props.product.variants.length === 0) return null
  const prices = props.product.variants[0].prices
  if (!prices || prices.length === 0) return null
  return prices[0]
})

const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

const handleAddToCart = async () => {
  if (!props.product.variants || props.product.variants.length === 0) return

  loading.value = true
  try {
    await addItem(props.product.variants[0].id, 1)
  } catch (error) {
    console.error('Error adding to cart:', error)
  } finally {
    loading.value = false
  }
}
</script>
