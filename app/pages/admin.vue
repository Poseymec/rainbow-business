<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
   
    <main class="p-4 md:ml-64 h-auto pt-20">
      <!-- Contenu principal du dashboard -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"></div>
        <!-- ... -->
      </div>
    </main>
  </div>
</template>

<script>
//import Header from '@/components/Header.vue'
//import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    AdminNavbar ,
    AdminSidebar
  }
}
</script>
