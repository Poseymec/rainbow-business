<!-- app/pages/admin/sliders/[id].vue -->
<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modifier le slider</h1>

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

      <!-- Image actuelle -->
      <div v-if="form.photoUrl">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image actuelle</h3>
        <img :src="form.photoUrl" alt="Slider" class="w-full h-48 object-cover rounded border mb-3" />
        <button
          type="button"
          @click="form.photoUrl = null; form.photo = null"
          class="text-sm text-red-600 hover:text-red-800"
        >
          Supprimer l’image actuelle
        </button>
      </div>

      <!-- Nouvelle image -->
      <div>
        <label for="photo" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {{ form.photoUrl ? 'Remplacer l’image' : 'Image *' }}
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          @change="handlePhotoUpload"
          :required="!form.photoUrl"
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
          Mettre à jour le slider
        </button>
        <NuxtLink
          to="/admin/sliders"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
    layout: 'admin'
})

const route = useRoute()

const form = reactive({
  name: '',
  photo: null,
  photoUrl: '',
  description: '',
  status: 'active'
})

onMounted(() => {
  // Mock
  const mockSlider = {
    id: route.params.id,
    name: 'Slider Accueil 1',
    photoUrl: 'https://placehold.co/400x200?text=Slider1',
    description: 'Nouvelle collection',
    status: 'active'
  }
  Object.assign(form, mockSlider)
})

const handlePhotoUpload = (event) => {
  form.photo = event.target.files[0]
  form.photoUrl = URL.createObjectURL(form.photo)
}

const submit = () => {
  if (!form.name || (!form.photo && !form.photoUrl)) {
    alert('Le nom et l’image sont requis.')
    return
  }
  console.log('Mise à jour du slider:', {
    id: route.params.id,
    ...form,
    photo: form.photo?.name
  })
  alert('Slider mis à jour avec succès !')
}
</script>