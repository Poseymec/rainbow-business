<!-- app/components/admin/ProductList.vue ou dans la page index -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useProductStore } from '~/stores/productStore'
import { useCategoryStore } from '~/stores/categoryStore'
definePageMeta({
    layout: 'admin'
})
const productStore = useProductStore()
const categoryStore = useCategoryStore()

const searchTerm = ref('')
const statusFilter = ref('all')

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
  if (categoryStore.categories.length === 0) {
    categoryStore.fetchCategories()
  }
})

const getCategoryName = (categoryId) => {
  const cat = categoryStore.categories.find(c => c.id === categoryId)
  return cat ? cat.name.fr : '—'
}

const filteredProducts = computed(() => {
  return productStore.products.filter(product => {
    const matchesSearch = product.name.fr.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          product.name.en.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || product.status === statusFilter.value
    return matchesSearch && matchesStatus
  }).map((product, index) => ({
    ...product,
    rank: index + 1,
    categoryName: getCategoryName(product.categorie_id)
  }))
})
</script>

<template>
  <!-- En-tête -->
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-red-600">Produits</h1>
    <div class="mt-4 flex flex-col sm:flex-row gap-4">
      <input v-model="searchTerm" placeholder="Rechercher..." class="..." />
      <select v-model="statusFilter" class="...">
        <option value="all">Tous les statuts</option>
        <option value="active">Actif</option>
        <option value="inactive">Inactif</option>
      </select>
      <NuxtLink to="/admin/product/create" class="...">Ajouter un produit</NuxtLink>
    </div>
  </div>

  <!-- Loading / Erreur -->
  <div v-if="productStore.loading" class="py-6 text-center">Chargement...</div>
  <div v-else-if="productStore.error" class="py-4 text-red-500">{{ productStore.error }}</div>
  <div v-else>
    <table class="w-full text-sm...">
      <thead>...</thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.rank }}</td>
          <td>{{ product.name.fr }}</td>
          <td class="hidden md:table-cell">{{ product.categoryName }}</td>
          <td class="hidden md:table-cell">
            {{ product.prix.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
          </td>
          <td>
            <span :class="product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ product.status === 'active' ? 'Actif' : 'Inactif' }}
            </span>
          </td>
          <td class="px-4 py-3">
            <div class="flex items-center gap-1 md:gap-2">
              <!-- Voir -->
              <NuxtLink
                :to="`/admin/product/${product.id}/`"
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Voir"
              >
                <Icon icon="mdi:eye" width="18" class="text-blue-500" />
              </NuxtLink>

              <!-- Éditer -->
              <NuxtLink
                :to="`/admin/product/${product.id}/edit`"
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Éditer"
              >
                <Icon icon="mdi:pencil" width="18" class="text-yellow-500" />
              </NuxtLink>

              <!-- Activer/Désactiver -->
              <button
                @click="toggleStatus(product)"
                class="p-2 rounded transition-colors"
                :title="product.status === 'active' ? 'Désactiver' : 'Activer'"
              >
                <Icon
                  :icon="product.status === 'active' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off'"
                  width="18"
                  :class="product.status === 'active' ? 'text-green-500' : 'text-gray-400'"
                />
              </button>

              <!-- Supprimer -->
              <button
                @click="confirmDelete(product)"
                class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Supprimer"
              >
                <Icon icon="mdi:delete" width="18" class="text-red-500" />
              </button>
            </div>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>