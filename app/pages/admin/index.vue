<!-- app/pages/admin/index.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold text-red-600 dark:text-white mb-6">Tableau de bord</h1>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-[#E8192C]">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Produits</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-[#E8192C]">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Commandes</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">89</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-[#E8192C]">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Clients</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">320</p>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-[#E8192C]">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Équipe</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphique ou liste récente -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activité récente</h2>
      <div class="space-y-4">
        <div class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
          <div class="w-2 h-2 bg-[#E8192C] rounded-full mr-3"></div>
          <span class="text-gray-700 dark:text-gray-300">Nouvelle commande passée</span>
          <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">il y a 2 min</span>
        </div>
        <div class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
          <div class="w-2 h-2 bg-[#E8192C] rounded-full mr-3"></div>
          <span class="text-gray-700 dark:text-gray-300">Produit ajouté : Imprimante X500</span>
          <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">il y a 15 min</span>
        </div>
        <div class="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
          <div class="w-2 h-2 bg-[#E8192C] rounded-full mr-3"></div>
          <span class="text-gray-700 dark:text-gray-300">Nouvel utilisateur inscrit</span>
          <span class="ml-auto text-sm text-gray-500 dark:text-gray-400">il y a 1h</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})
</script>