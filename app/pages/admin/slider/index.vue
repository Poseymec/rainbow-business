<!-- app/components/admin/SliderList.vue -->
<script setup>
import { ref, computed } from 'vue'
definePageMeta({
    layout: 'admin'
})

const sliders = ref([
  { id: 1, rank: 1, name: 'Slider Accueil 1', status: 'active' },
  { id: 2, rank: 2, name: 'Slider Promo', status: 'inactive' }
])

const searchTerm = ref('')
const statusFilter = ref('all')

const filteredSliders = computed(() => {
  return sliders.value.filter(slider => {
    const matchesSearch = slider.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || slider.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const toggleStatus = (slider) => {
  slider.status = slider.status === 'active' ? 'inactive' : 'active'
}

const confirmDelete = (slider) => {
  if (confirm(`Supprimer "${slider.name}" ?`)) {
    sliders.value = sliders.value.filter(s => s.id !== slider.id)
  }
}
</script>

<template>
  <!-- 🔷 Entête -->
  <div class="mb-6">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Sliders</h1>
    <div class="mt-4 flex flex-col sm:flex-row gap-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher..."
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
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
        to="/admin/slider/create"
        class="px-4 py-2 bg-[#E8192C] text-white rounded-lg hover:bg-red-700 transition-colors text-center"
      >
        Ajouter
      </NuxtLink>
    </div>
  </div>

  <!-- 🔷 Tableau -->
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
        <tr>
          <th scope="col" class="px-4 py-3">#</th>
          <th scope="col" class="px-4 py-3">Nom</th>
          <th scope="col" class="px-4 py-3">Statut</th>
          <th scope="col" class="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="slider in filteredSliders"
          :key="slider.id"
          class="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <td class="px-4 py-3">{{ slider.rank }}</td>
          <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">
            {{ slider.name }}
          </td>
          <td class="px-4 py-3">
            <span
              :class="[
                'px-2 py-1 rounded-full text-xs font-medium',
                slider.status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              ]"
            >
              {{ slider.status === 'active' ? 'Actif' : 'Inactif' }}
            </span>
          </td>
          <td class="px-4 py-3 space-x-1 whitespace-nowrap">
            <NuxtLink
              :to="`/admin/slider/${slider.id}`"
              class="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              👁️
            </NuxtLink>
            <NuxtLink
              :to="`/admin/slider/${slider.id}/edit`"
              class="px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700"
            >
              ✏️
            </NuxtLink>
            <button
              @click="toggleStatus(slider)"
              :class="[
                'px-2 py-1 text-white text-xs rounded',
                slider.status === 'active'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              ]"
            >
              {{ slider.status === 'active' ? '🔴' : '🟢' }}
            </button>
            <button
              @click="confirmDelete(slider)"
              class="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>