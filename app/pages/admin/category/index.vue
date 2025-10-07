<!-- app/components/admin/CategoryList.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useCategoryStore } from '~/stores/categoryStore'

definePageMeta({
    layout: 'admin'
})

const categoryStore = useCategoryStore()

const searchTerm = ref('')
const statusFilter = ref('all') // ⚠️ Tu n’as pas de "status" dans ton modèle → à ajouter ou supprimer

// ⚠️ Si tu n’as pas de champ "status", retire le filtre de statut
// Sinon, ajoute-le dans ton modèle Laravel

onMounted(() => {
  if (categoryStore.categories.length === 0) {
    categoryStore.fetchCategories()
  }
})

const filteredCategories = computed(() => {
  return categoryStore.categories.filter(category => {
    const matchesSearch = category.name.fr.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          category.name.en.toLowerCase().includes(searchTerm.value.toLowerCase())
    // Si tu gardes le statut :
    // const matchesStatus = statusFilter.value === 'all' || category.status === statusFilter.value
    return matchesSearch
  })
})

const confirmDelete = (category) => {
  if (confirm(`Supprimer "${category.name.fr}" ?`)) {
    categoryStore.deleteCategory(category.id)
  }
}
</script>

<template>
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-red-600 dark:text-red-400">Catégories</h1>
    <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher..."
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      />
      <!--
      ⚠️ Supprime ce select si tu n’as pas de "status"
      <select v-model="statusFilter" class="...">
        <option value="all">Tous les statuts</option>
        <option value="active">Actif</option>
        <option value="inactive">Inactif</option>
      </select>
      -->
      <NuxtLink
        to="/admin/category/create"
        class="px-4 py-2 bg-[#E8192C] text-white rounded-lg hover:bg-red-700 transition-colors text-center"
      >
        Ajouter
      </NuxtLink>
    </div>
  </div>

  <!-- Affichage loading -->
  <div v-if="categoryStore.loading" class="text-center py-6">Chargement des catégories...</div>

  <!-- Erreur -->
  <div v-else-if="categoryStore.error" class="text-red-500 py-4">
    {{ categoryStore.error }}
  </div>

  <!-- Tableau -->
  <div v-else class="overflow-x-auto rounded-lg shadow-sm">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th scope="col" class="px-4 py-3">Nom (FR / EN)</th>
          <th scope="col" class="px-4 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(category, index) in filteredCategories"
          :key="category.id"
          class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <td class="px-4 py-3">{{ index + 1 }}</td>
          <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">
            {{ category.name.fr }}<br />
            <span class="text-sm text-gray-500">{{ category.name.en }}</span>
          </td>
          <td class="px-4 py-3 flex gap-2 justify-center">
            <NuxtLink
              :to="`/admin/category/${category.id}/edit`"
              class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icon icon="mdi:pencil" width="20" class="text-yellow-500" />
            </NuxtLink>
            <button
              @click="confirmDelete(category)"
              class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Icon icon="mdi:delete" width="20" class="text-red-500" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>