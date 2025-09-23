<!-- app/layouts/admin.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Navbar -->
    <AdminNavbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

    <!-- Contenu principal -->
    <div class="flex flex-1 pt-16">
      <!-- Sidebar -->
      <AdminSidebar :is-open="isSidebarOpen" class="fixed top-16 left-0 bottom-0 z-40" />

      <!-- Zone de contenu -->
      <div class="flex-1 ml-0 md:ml-64">
        <main class="p-6">
          <slot /> <!-- Contenu dynamique des pages -->
        </main>
        <AdminFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//import AdminNavbar from '~/components/admin/AdminNavbar.vue'
//import AdminSidebar from '~/components/admin/AdminSidebar.vue'
//import AdminFooter from '~/components/admin/AdminFooter.vue'

const isSidebarOpen = ref(true)
</script>