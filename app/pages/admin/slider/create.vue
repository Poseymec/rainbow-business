<!-- app/pages/admin/sliders/create.vue -->
<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600  mb-6">Ajouter un slider</h1>

    <form @submit.prevent="submit" class="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <!-- Nom -->
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

      <!-- Photo -->
      <div>
        <label for="photo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Photo *</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          @change="handlePhotoUpload"
          required
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8192C] file:text-white hover:file:bg-red-700"
        />
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        ></textarea>
      </div>

      <!-- Statut -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Statut</label>
        <label class="inline-flex items-center">
          <input
            v-model="form.status"
            type="checkbox"
            :true-value="'active'"
            :false-value="'inactive'"
            class="sr-only peer"
          />
          <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#E8192C]"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ form.status === 'active' ? 'Actif' : 'Inactif' }}
          </span>
        </label>
      </div>

      <!-- Boutons -->
      <div class="flex gap-3">
        <button
          type="submit"
          class="px-6 py-2 bg-[#E8192C] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Enregistrer le slider
        </button>
        <NuxtLink
          to="/admin/slider/"
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
  name: '',
  photo: null,
  description: '',
  status: 'active'
})

const handlePhotoUpload = (event) => {
  form.photo = event.target.files[0]
}

const submit = () => {
  if (!form.name || !form.photo) {
    alert('Veuillez remplir les champs obligatoires.')
    return
  }
  console.log('Nouveau slider:', form)
  alert('Slider ajouté avec succès !')
}
</script>