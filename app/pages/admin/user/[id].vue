<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Détails de l'utilisateur</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-6">
      <!-- Informations de base -->
      <div>
        <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Informations générales</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nom</label>
            <p class="text-gray-900 dark:text-white">{{ user.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <p class="text-gray-900 dark:text-white">{{ user.email }}</p>
          </div>
        </div>
      </div>

      <!-- Rôles assignés -->
      <div>
        <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Rôles assignés</h2>
        <ul v-if="user.roles.length > 0" class="space-y-2">
          <li v-for="role in user.roles" :key="role.id" class="text-sm text-gray-700 dark:text-gray-300">
            {{ role.name }}
          </li>
        </ul>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucun rôle assigné</p>
      </div>

      <!-- Permissions associées -->
      <div>
        <h2 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Permissions</h2>
        <ul v-if="user.permissions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li v-for="permission in user.permissions" :key="permission.id" class="text-sm text-gray-700 dark:text-gray-300">
            {{ permission.name }}
          </li>
        </ul>
        <p v-else class="text-sm text-gray-500 dark:text-gray-400">Aucune permission assignée</p>
      </div>

      <!-- Bouton d'action -->
      <div class="flex flex-col sm:flex-row gap-3">
        <NuxtLink
          to="/admin/user/"
          class="px-6 py-2 border bg-red-600 border-red-300 dark:border-red-600 text-white font-medium rounded-lg hover:bg-red-700 text-center"
        >
          Retour
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const user = reactive({
  id: '',
  name: '',
  email: '',
  roles: [],
  permissions: []
})

// Simule le chargement des données utilisateur depuis une API
onMounted(() => {
  // Mock: récupère les informations de l'utilisateur par ID
  const mockUser = {
    id: route.params.id,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    roles: [
      { id: 1, name: 'Administrateur' },
      { id: 2, name: 'Éditeur' }
    ],
    permissions: [
      { id: 1, name: 'Voir les utilisateurs' },
      { id: 2, name: 'Modifier les utilisateurs' },
      { id: 4, name: 'Gérer les rôles' }
    ]
  }
  user.id = mockUser.id
  user.name = mockUser.name
  user.email = mockUser.email
  user.roles = mockUser.roles
  user.permissions = mockUser.permissions
})
</script>