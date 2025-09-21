<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Navbar globale -->
    <ClientNavbar />

    <!-- Contenu principal -->
    <main class="flex-1 pt-[70px]">
      <slot />
    </main>

    <!-- Footer global -->
    <ClientFooter />
  </div>
</template>

<script setup>
import ClientNavbar from '~/components/ClientNavbar.vue'
import ClientFooter from '~/components/ClientFooter.vue'

</script>
