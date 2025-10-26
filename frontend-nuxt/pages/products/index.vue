<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
      <p class="text-gray-600">Browse our complete collection</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="lg:w-64 shrink-0">
        <div class="card sticky top-24">
          <h2 class="font-bold text-lg mb-4">Filters</h2>

          <!-- Search -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="input"
              @input="applyFilters"
            />
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div class="flex gap-2">
              <input
                v-model.number="filters.price_min"
                type="number"
                placeholder="Min"
                class="input"
                @change="applyFilters"
              />
              <input
                v-model.number="filters.price_max"
                type="number"
                placeholder="Max"
                class="input"
                @change="applyFilters"
              />
            </div>
          </div>

          <!-- Clear Filters -->
          <button @click="clearFilters" class="btn btn-outline w-full">
            Clear Filters
          </button>
        </div>
      </aside>

      <!-- Products Grid -->
      <div class="flex-1">
        <!-- Results Count -->
        <div class="mb-6 flex items-center justify-between">
          <p class="text-gray-600">
            {{ totalProducts }} products found
          </p>
          <select v-model="sortBy" @change="applyFilters" class="input w-auto">
            <option value="">Sort by</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="card animate-pulse">
            <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>

        <!-- Products Grid -->
        <div
          v-else-if="products && products.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <Icon name="heroicons:shopping-bag" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-500 mb-4">No products found</p>
          <button @click="clearFilters" class="btn btn-primary">
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="products && products.length > 0" class="mt-8 flex justify-center gap-2">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="btn btn-outline"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            Previous
          </button>
          <span class="px-4 py-2 flex items-center text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="btn btn-outline"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductFilters } from '~/types/medusa'

const { getProducts } = useProducts()

const searchQuery = ref('')
const sortBy = ref('')
const currentPage = ref(1)
const itemsPerPage = 12

const filters = ref<ProductFilters>({
  limit: itemsPerPage,
  offset: 0,
})

const { data: productsData, pending, refresh } = await useAsyncData(
  'products',
  () => getProducts(filters.value),
  { watch: [filters] }
)

const products = computed(() => productsData.value?.products || [])
const totalProducts = computed(() => productsData.value?.count || 0)
const totalPages = computed(() => Math.ceil(totalProducts.value / itemsPerPage))

const applyFilters = () => {
  filters.value = {
    ...filters.value,
    q: searchQuery.value || undefined,
    offset: (currentPage.value - 1) * itemsPerPage,
  }
  refresh()
}

const clearFilters = () => {
  searchQuery.value = ''
  sortBy.value = ''
  filters.value = {
    limit: itemsPerPage,
    offset: 0,
  }
  currentPage.value = 1
  refresh()
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    filters.value.offset = (currentPage.value - 1) * itemsPerPage
    refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    filters.value.offset = (currentPage.value - 1) * itemsPerPage
    refresh()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>
