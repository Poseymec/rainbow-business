<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 class="text-2xl font-bold text-red-600 mb-6">{{ isEdit ? 'Modifier le rôle' : 'Créer un rôle' }}</h1>

    <form @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <!-- Nom du rôle -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom du rôle *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        />
      </div>

      <!-- Permissions -->
      <div>
        <label for="permissions" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions *</label>
        <select
          id="permissions"
          v-model="form.permissions"
          multiple
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        >
          <option v-for="permission in permissions" :key="permission.id" :value="permission.id">
            {{ permission.name }}
          </option>
        </select>
      </div>

      <!-- Utilisateurs assignés -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Utilisateurs assignés</label>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="user in users" :key="user.id" class="flex items-center">
            <input
              :id="'user-' + user.id"
              type="checkbox"
              v-model="form.users"
              :value="user.id"
              class="h-4 w-4 text-[#E8192C] focus:ring-[#E8192C] border-gray-300 dark:border-gray-600 rounded"
            />
            <label :for="'user-' + user.id" class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ user.name }}</label>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          {{ isEdit ? 'Mettre à jour' : 'Créer' }}
        </button>
        <NuxtLink
          to="/admin/role/"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id !== 'new')

const form = reactive({
  name: '',
  permissions: [],
  users: []
})

// Liste simulée des permissions et utilisateurs
const permissions = reactive([
  { id: 1, name: 'Voir les utilisateurs' },
  { id: 2, name: 'Modifier les utilisateurs' },
  { id: 3, name: 'Supprimer les utilisateurs' },
  { id: 4, name: 'Gérer les rôles' },
])

const users = reactive([
  { id: 1, name: 'Jean Dupont' },
  { id: 2, name: 'Marie Dubois' },
  { id: 3, name: 'Pierre Martin' },
])

// Simule le chargement depuis une API pour l'édition
onMounted(() => {
  if (isEdit.value) {
    // Mock: récupère le rôle par ID
    const mockRole = {
      id: route.params.id,
      name: 'Administrateur',
      permissions: [1, 2, 4],
      users: [1, 2]
    }
    form.name = mockRole.name
    form.permissions = mockRole.permissions
    form.users = mockRole.users
  }
})

const submit = () => {
  if (!form.name) {
    alert('Le nom du rôle est requis.')
    return
  }
  if (form.permissions.length === 0) {
    alert('Veuillez sélectionner au moins une permission.')
    return
  }
  if (isEdit.value) {
    console.log('Mise à jour du rôle:', { id: route.params.id, ...form })
    alert('Rôle mis à jour avec succès !')
  } else {
    console.log('Création du rôle:', form)
    alert('Rôle créé avec succès !')
  }
  router.push('/admin/roles')
}
</script>