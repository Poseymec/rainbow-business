<!-- app/components/admin/AdminNavbar.vue -->
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md">
    <div class="flex items-center justify-between px-4 py-3">
      <!-- Logo + Toggle Sidebar -->
      <div class="flex items-center">
        <button
          @click="$emit('toggle-sidebar')"
          class="p-2 mr-3 text-gray-600 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div class="flex items-center">
          <img
            src="/images/logo.png"
            class="h-12"
            alt="Logo"
          />
          <span class="text-red-600 font-bold" >RBC</span>
          
        </div>
      </div>

      <!-- 🔷 Menu Accès rapide — Desktop : en ligne / Mobile : déroulant -->
      <div class="hidden md:flex items-center space-x-4">
        <NuxtLink
          to="/"
          class="text-sm font-medium text-gray-700 hover:text-[#E8192C] dark:text-gray-300 dark:hover:text-[#E8192C]"
        >
          🏠 Accueil client
        </NuxtLink>
        <NuxtLink
          to="/products"
          class="text-sm font-medium text-gray-700 hover:text-[#E8192C] dark:text-gray-300 dark:hover:text-[#E8192C]"
        >
          🛍️ Boutique
        </NuxtLink>
        
      </div>

      <!-- 🔷 Menu déroulant uniquement sur mobile -->
      <div class="md:hidden relative">
        <button
          @click="showMenu = !showMenu"
          class="flex items-center p-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Accès rapide
          <svg class="w-4 h-4 ml-1" :class="{ 'rotate-180': showMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          v-show="showMenu"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
          @click.outside="showMenu = false"
        >
          <NuxtLink
            to="/"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            🏠 Page d'accueil client
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            🛍️ Boutique produits
          </NuxtLink>
         
        </div>
      </div>

      <!-- Profil -->
      <div class="flex items-center">
       <ThemeSelector/>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['toggle-sidebar'])

const showMenu = ref(false)
</script>