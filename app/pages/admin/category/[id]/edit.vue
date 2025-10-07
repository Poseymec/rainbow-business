<!-- app/pages/admin/category/[id]/edit.vue -->
<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Modifier la catégorie</h1>

    <form v-if="!loading" @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
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
          :disabled="categoryStore.loading"
          class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70"
        >
          {{ categoryStore.loading ? 'Mise à jour...' : 'Mettre à jour' }}
        </button>
        <NuxtLink
          to="/admin/category/"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>

    <div v-else class="text-center py-10">
      Chargement...
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryStore } from '~/stores/categoryStore'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()

const form = reactive({
  name: {
    fr: '',
    en: ''
  }
})

const loading = ref(true)

onMounted(async () => {
  const id = Number(route.params.id)
  const existing = categoryStore.getCategoryById(id)
  
  if (existing) {
    form.name.fr = existing.name.fr
    form.name.en = existing.name.en
    loading.value = false
  } else {
    try {
      // Si pas en cache, on fetch directement (optionnel)
      const category = await $fetch(`/api/categories/${id}`, {
        credentials: 'include'
      })
      form.name.fr = category.name.fr
      form.name.en = category.name.en
    } catch (err) {
      alert('Catégorie introuvable')
      router.push('/admin/category/')
    } finally {
      loading.value = false
    }
  }
})

const submit = async () => {
  if (!form.name.fr.trim() || !form.name.en.trim()) {
    alert('Les noms en français et anglais sont requis.')
    return
  }

  try {
    await categoryStore.updateCategory(Number(route.params.id), form)
    alert('Catégorie mise à jour avec succès !')
    router.push('/admin/category/')
  } catch (err) {
    alert('Erreur : ' + (categoryStore.error || 'Échec de la mise à jour.'))
  }
}
</script>