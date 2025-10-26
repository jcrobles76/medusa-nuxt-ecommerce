<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">Medusa Store</h3>
          <p class="text-sm">
            Modern e-commerce powered by Medusa and Nuxt. Your one-stop shop for quality products.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/products" class="hover:text-white transition-colors">
                Products
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition-colors">
                About Us
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition-colors">
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">Customer Service</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/shipping" class="hover:text-white transition-colors">
                Shipping Info
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/returns" class="hover:text-white transition-colors">
                Returns
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="hover:text-white transition-colors">
                FAQ
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">Newsletter</h3>
          <p class="text-sm mb-4">Subscribe to get special offers and updates.</p>
          <form class="flex">
            <input
              type="email"
              placeholder="Your email"
              class="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              class="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
            >
              <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
        <p>&copy; {{ new Date().getFullYear() }} Medusa Store. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>
