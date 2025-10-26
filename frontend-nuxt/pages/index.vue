<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
      <div class="container mx-auto px-4 py-20 text-center">
        <h1 class="text-5xl font-bold mb-6">Welcome to Medusa Store</h1>
        <p class="text-xl mb-8 text-primary-100">
          Discover amazing products at great prices
        </p>
        <NuxtLink to="/products" class="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg">
          Shop Now
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="container mx-auto px-4 py-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
        <NuxtLink to="/products" class="text-primary-600 hover:text-primary-700 font-medium">
          View All →
        </NuxtLink>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="card animate-pulse">
          <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products && products.length > 0" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:shopping-bag" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500">No products available</p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:truck" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="font-bold text-lg mb-2">Free Shipping</h3>
            <p class="text-gray-600">On orders over $50</p>
          </div>

          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:shield-check" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="font-bold text-lg mb-2">Secure Payment</h3>
            <p class="text-gray-600">100% secure transactions</p>
          </div>

          <div class="text-center">
            <div class="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:arrow-path" class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="font-bold text-lg mb-2">Easy Returns</h3>
            <p class="text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { getProducts } = useProducts()

const { data: productsData, pending } = await useAsyncData('featured-products', () =>
  getProducts({ limit: 8 })
)

const products = computed(() => productsData.value?.products || [])
</script>
