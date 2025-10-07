<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Ajouter une catégorie</h1>

    <form @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <!-- Nom (FR / EN) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name_fr" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom (Français) *</label>
          <input
            id="name_fr"
            v-model="form.name.fr"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
          />
        </div>
        <div>
          <label for="name_en" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nom (Anglais) *</label>
          <input
            id="name_en"
            v-model="form.name.en"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
          />
        </div>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
        >
          {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
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
import { useRouter } from 'vue-router'
import { useCategoryStore } from '~/stores/categoryStore'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const categoryStore = useCategoryStore()

const form = reactive({
  name: {
    fr: '',
    en: ''
  }
})

const submit = async () => {
  if (!form.name.fr.trim() || !form.name.en.trim()) {
    alert('Veuillez remplir les noms en français et en anglais.')
    return
  }

  try {
    await categoryStore.createCategory(form)
    alert('Catégorie ajoutée avec succès !')
    router.push('/admin/category/')
  } catch (err) {
    alert('Erreur : ' + (categoryStore.error || 'Impossible d’ajouter la catégorie.'))
  }
}
</script>