<!-- app/pages/admin/categories/create.vue -->
<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Ajouter une catégorie</h1>

    <form @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        />
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Enregistrer
        </button>
        <NuxtLink
          to="/admin/category/"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

definePageMeta({
    layout: 'admin'
})

const form = reactive({
  name: ''
})

const submit = () => {
  // À connecter à ton API
  console.log('Nouvelle catégorie:', form)
  alert('Catégorie ajoutée avec succès !')
}
</script>