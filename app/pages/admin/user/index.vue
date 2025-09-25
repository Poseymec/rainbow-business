<!-- app/pages/admin/users/index.vue -->
<template>
  <div class="p-4">

    <!-- Recherche -->
    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher..."
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      />
    </div>

    <!-- 🔷 Mobile : liste verticale -->
    <div class="md:hidden space-y-4">
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
      >
        <p class="font-bold text-gray-900 dark:text-white">{{ user.name }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ user.email }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">Rôle : {{ user.role }}</p>
        <div class="mt-2">
          <span
            :class="[
              'px-2 py-1 text-xs rounded',
              user.status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            ]"
          >
            {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
          </span>
        </div>
        <div class="mt-3 flex gap-2">
         <NuxtLink :to="`/admin/users/${user.id}`" class="px-2 py-1 bg-blue-600 text-white text-xs rounded">👁️</NuxtLink>
          <NuxtLink :to="`/admin/user/${user.id}/edit`" class="px-2 py-1 bg-yellow-600 text-white text-xs rounded">✏️</NuxtLink>
          <button @click="toggleStatus(user)" class="px-2 py-1 bg-gray-600 text-white text-xs rounded">
            {{ user.status === 'active' ? '🔴' : '🟢' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 🔷 Desktop : tableau -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Nom</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Rôle</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Statut</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ user.name }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{{ user.email }}</td>
            <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ user.role }}</td>
            <td class="px-4 py-4 text-sm">
              <span
                :class="[
                  'px-2 py-1 text-xs rounded',
                  user.status === 'active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                ]"
              >
                {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="px-4 py-4 text-sm space-x-2">
             <NuxtLink :to="`/admin/user/${user.id}`" class="px-2 py-1 bg-blue-600 text-white text-xs rounded">👁️</NuxtLink>
              <NuxtLink :to="`/admin/user/${user.id}/edit`" class="px-2 py-1 bg-yellow-600 text-white text-xs rounded">✏️</NuxtLink>
              <button @click="toggleStatus(user)" class="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                {{ user.status === 'active' ? '🔴' : '🟢' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  { id: 1, name: 'Admin', email: 'admin@rainbow.com', role: 'Administrateur', status: 'active' },
  { id: 2, name: 'Jean Dupont', email: 'jean@client.com', role: 'Client', status: 'inactive' }
])

const searchTerm = ref('')
const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const toggleStatus = (user) => {
  user.status = user.status === 'active' ? 'inactive' : 'active'
}
definePageMeta({
  layout: 'admin'
})
</script>