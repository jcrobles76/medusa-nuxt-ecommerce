<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-primary-600">
          Medusa Store
        </NuxtLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="text-gray-700 hover:text-primary-600 transition-colors">
            Products
          </NuxtLink>
        </div>

        <!-- Cart & User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search Icon -->
          <button class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon name="heroicons:magnifying-glass" class="w-6 h-6 text-gray-700" />
          </button>

          <!-- User Icon -->
          <NuxtLink to="/account" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon name="heroicons:user" class="w-6 h-6 text-gray-700" />
          </NuxtLink>

          <!-- Cart Icon with Badge -->
          <NuxtLink to="/cart" class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon name="heroicons:shopping-cart" class="w-6 h-6 text-gray-700" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore()
</script>
