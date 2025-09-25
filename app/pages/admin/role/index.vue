<!-- app/pages/admin/roles/index.vue -->
<template>
  <div class="p-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-red-600">Rôles</h1>
      <NuxtLink
        to="/admin/role/create"
        class="mt-3 sm:mt-0 px-4 py-2 bg-[#E8192C] text-white text-sm font-medium rounded-lg hover:bg-red-700"
      >
        ➕ Ajouter
      </NuxtLink>
    </div>

    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher un rôle..."
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-4">
      <div
        v-for="role in filteredRoles"
        :key="role.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border"
      >
        <h3 class="font-bold text-gray-900 dark:text-white">{{ role.name }}</h3>
        <div class="mt-2 text-sm text-gray-700 dark:text-gray-300">
          <p class="font-medium">Permissions :</p>
          <div class="flex flex-wrap gap-1 mt-1">
            <span
              v-for="perm in role.permissions"
              :key="perm"
              class="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded"
            >
              {{ perm }}
            </span>
          </div>
        </div>
        <div class="mt-3 flex gap-2">
          <NuxtLink :to="`/admin/rols/${role.id}/edit`" class="px-2 py-1 bg-yellow-600 text-white text-xs rounded">✏️ Modifier</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Rôle</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Permissions</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="role in filteredRoles" :key="role.id">
            <td class="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ role.name }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="perm in role.permissions"
                  :key="perm"
                  class="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded"
                >
                  {{ perm }}
                </span>
              </div>
            </td>
            <td class="px-4 py-4 text-sm">
              <NuxtLink :to="`/admin/user/role/${role.id}`" class="px-3 py-1 bg-yellow-600 text-white text-xs rounded">✏️</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const roles = ref([
  { id: 1, name: 'Administrateur', permissions: ['users.*', 'products.*', 'roles.*'] },
  { id: 2, name: 'Éditeur', permissions: ['products.view', 'products.edit'] }
])

const searchTerm = ref('')
const filteredRoles = computed(() => {
  return roles.value.filter(r => r.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})
definePageMeta({
  layout: 'admin'
})
</script>