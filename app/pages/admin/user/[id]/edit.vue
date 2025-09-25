<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
      <h1 class="text-2xl font-bold text-red-600">Liste des rôles</h1>
      <NuxtLink
        to="/admin/roles/new"
        class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Créer un rôle
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <form @submit.prevent="editSelectedRole" class="space-y-4">
        <div v-for="role in roles" :key="role.id" class="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-2">
          <div class="flex items-center">
            <input
              :id="'role-' + role.id"
              type="radio"
              v-model="selectedRoleId"
              :value="role.id"
              class="h-4 w-4 text-[#E8192C] focus:ring-[#E8192C] border-gray-300 dark:border-gray-600"
            />
            <label :for="'role-' + role.id" class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ role.name }}</label>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button
            type="submit"
            :disabled="!selectedRoleId"
            class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Modifier le rôle sélectionné
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin'
})

const router = useRouter()
const selectedRoleId = ref(null)

// Liste simulée des rôles
const roles = ref([
  { id: 1, name: 'Administrateur' },
  { id: 2, name: 'Éditeur' },
  { id: 3, name: 'Utilisateur' },
])

const editSelectedRole = () => {
  if (selectedRoleId.value) {
    router.push(`/admin/roles/${selectedRoleId.value}`)
  }
}
</script>