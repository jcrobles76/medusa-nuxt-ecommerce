<template>
  <div v-if="product" class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-8 text-sm text-gray-600">
      <NuxtLink to="/" class="hover:text-primary-600">Home</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/products" class="hover:text-primary-600">Products</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-gray-900">{{ product.title }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Product Images -->
      <div>
        <!-- Main Image -->
        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <img
            v-if="selectedImage"
            :src="selectedImage"
            :alt="product.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <Icon name="heroicons:photo" class="w-24 h-24 text-gray-400" />
          </div>
        </div>

        <!-- Image Thumbnails -->
        <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-4">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = image.url"
            class="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors"
            :class="selectedImage === image.url ? 'border-primary-600' : 'border-transparent hover:border-gray-300'"
          >
            <img :src="image.url" :alt="`${product.title} ${index + 1}`" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ product.title }}</h1>

        <!-- Price -->
        <div class="mb-6">
          <span class="text-3xl font-bold text-primary-600">
            {{ formatPrice(selectedVariant?.prices?.[0]?.amount || 0, selectedVariant?.prices?.[0]?.currency_code || 'USD') }}
          </span>
        </div>

        <!-- Description -->
        <div class="mb-6">
          <h2 class="font-bold text-lg mb-2">Description</h2>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <!-- Variants -->
        <div v-if="product.options && product.options.length > 0" class="mb-6">
          <div v-for="option in product.options" :key="option.id" class="mb-4">
            <label class="block font-medium text-gray-700 mb-2">{{ option.title }}</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="value in option.values"
                :key="value.id"
                @click="selectOption(option.id, value.value)"
                class="px-4 py-2 border rounded-lg transition-colors"
                :class="
                  selectedOptions[option.id] === value.value
                    ? 'border-primary-600 bg-primary-50 text-primary-600'
                    : 'border-gray-300 hover:border-gray-400'
                "
              >
                {{ value.value }}
              </button>
            </div>
          </div>
        </div>

        <!-- Quantity -->
        <div class="mb-6">
          <label class="block font-medium text-gray-700 mb-2">Quantity</label>
          <div class="flex items-center gap-4">
            <button
              @click="quantity > 1 && quantity--"
              class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              :disabled="quantity <= 1"
            >
              <Icon name="heroicons:minus" class="w-5 h-5" />
            </button>
            <span class="text-lg font-medium w-12 text-center">{{ quantity }}</span>
            <button
              @click="quantity++"
              class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
            >
              <Icon name="heroicons:plus" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Add to Cart -->
        <button
          @click="handleAddToCart"
          :disabled="!selectedVariant || loading"
          class="btn btn-primary w-full py-4 text-lg mb-4"
        >
          <Icon v-if="!loading" name="heroicons:shopping-cart" class="w-5 h-5 mr-2" />
          <Icon v-else name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
          {{ loading ? 'Adding...' : 'Add to Cart' }}
        </button>

        <!-- Product Details -->
        <div class="border-t pt-6">
          <h3 class="font-bold text-lg mb-4">Product Details</h3>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between">
              <dt class="text-gray-600">SKU:</dt>
              <dd class="font-medium">{{ selectedVariant?.sku || 'N/A' }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-gray-600">Weight:</dt>
              <dd class="font-medium">{{ product.weight ? `${product.weight}g` : 'N/A' }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else-if="pending" class="container mx-auto px-4 py-8">
    <div class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="aspect-square bg-gray-200 rounded-lg"></div>
        <div>
          <div class="h-10 bg-gray-200 rounded mb-4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div class="h-20 bg-gray-200 rounded mb-6"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else class="container mx-auto px-4 py-16 text-center">
    <Icon name="heroicons:exclamation-circle" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
    <p class="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
    <NuxtLink to="/products" class="btn btn-primary">
      Browse Products
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/medusa'

const route = useRoute()
const { getProduct } = useProducts()
const { addItem } = useCart()

const { data: product, pending } = await useAsyncData(`product-${route.params.id}`, () =>
  getProduct(route.params.id as string)
)

const selectedImage = ref(product.value?.thumbnail || product.value?.images?.[0]?.url || '')
const selectedOptions = ref<Record<string, string>>({})
const quantity = ref(1)
const loading = ref(false)

// Initialize first image
watch(
  () => product.value,
  (newProduct) => {
    if (newProduct && !selectedImage.value) {
      selectedImage.value = newProduct.thumbnail || newProduct.images?.[0]?.url || ''
    }
  },
  { immediate: true }
)

const selectedVariant = computed(() => {
  if (!product.value?.variants) return null

  // If no options selected, return first variant
  if (Object.keys(selectedOptions.value).length === 0) {
    return product.value.variants[0]
  }

  // Find variant matching selected options
  return product.value.variants.find((variant) => {
    return variant.options?.every((opt) => selectedOptions.value[opt.option_id] === opt.value)
  }) || product.value.variants[0]
})

const selectOption = (optionId: string, value: string) => {
  selectedOptions.value[optionId] = value
}

const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

const handleAddToCart = async () => {
  if (!selectedVariant.value) return

  loading.value = true
  try {
    await addItem(selectedVariant.value.id, quantity.value)
    // Optional: Show success message
  } catch (error) {
    console.error('Error adding to cart:', error)
    // Optional: Show error message
  } finally {
    loading.value = false
  }
}
</script>
