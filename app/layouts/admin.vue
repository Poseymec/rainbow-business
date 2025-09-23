<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Navbar globale -->
    <AdminNavbar />
    <AdminSidebar />
    <!-- Contenu principal -->
    <main class="flex-1 pt-[70px]">
      <slot />
    </main>

    <!-- Footer global -->
    <ClientFooter />
  </div>
</template>

<script setup>
import AdminNavbar from '~/components/AdminNavbar.vue'
import AdminSidebar from '~/components/AdminSidebar.vue'
import ClientFooter from '~/components/ClientFooter.vue'

</script>
