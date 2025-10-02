<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'admin'
})

const products = ref([
  { id: 1, rank: 1, name: 'Imprimante Laser Pro X500', category: 'Imprimantes', price: 299.99, status: 'active' },
  { id: 2, rank: 2, name: 'Scanner Documentaire', category: 'Scanners', price: 189.5, status: 'inactive' },
  { id: 3, rank: 3, name: 'Photocopieur A3', category: 'Photocopieurs', price: 499.99, status: 'active' }
])

const searchTerm = ref('')
const statusFilter = ref('all')

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || product.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const toggleStatus = (product) => {
  product.status = product.status === 'active' ? 'inactive' : 'active'
}

const confirmDelete = (product) => {
  if (confirm(`Voulez-vous vraiment supprimer "${product.name}" ?`)) {
    products.value = products.value.filter(p => p.id !== product.id)
  }
}
</script>

<template>
  <!-- 🔷 Entête -->
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-red-600">Produits</h1>
    <div class="mt-4 flex flex-col sm:flex-row gap-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher..."
        class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      />
      <select
        v-model="statusFilter"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="all">Tous les statuts</option>
        <option value="active">Actif</option>
        <option value="inactive">Inactif</option>
      </select>
      <NuxtLink
        to="/admin/product/create"
        class="px-4 py-2 bg-[#E8192C] text-white rounded-lg hover:bg-red-700 transition-colors text-center whitespace-nowrap"
      >
        Ajouter un produit
      </NuxtLink>
    </div>
  </div>

  <!-- 🔷 Tableau -->
  <div class="overflow-x-auto rounded-lg border dark:border-gray-700">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th scope="col" class="px-4 py-3">Nom</th>
          <th scope="col" class="px-4 py-3 hidden md:table-cell">Catégorie</th>
          <th scope="col" class="px-4 py-3 hidden md:table-cell">Prix</th>
          <th scope="col" class="px-4 py-3">Statut</th>
          <th scope="col" class="px-4 py-3 w-0">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in filteredProducts"
          :key="product.id"
          class="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
          <td class="px-4 py-3 font-mono">{{ product.rank }}</td>
          <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">
            {{ product.name }}
          </td>
          <td class="px-4 py-3 hidden md:table-cell">{{ product.category }}</td>
          <td class="px-4 py-3 hidden md:table-cell">
            {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
          </td>
          <td class="px-4 py-3">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                product.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
              ]"
            >
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

    <!-- Message si aucune donnée -->
    <div v-if="filteredProducts.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
      Aucun produit trouvé.
    </div>
  </div>
</template>