<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Initialize cart on app load
const { getCart } = useCart()

onMounted(async () => {
  try {
    await getCart()
  } catch (error) {
    console.error('Failed to initialize cart:', error)
  }
})
</script>
