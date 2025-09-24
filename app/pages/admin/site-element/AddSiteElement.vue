<!-- app/pages/admin/site-elements/create.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ajouter un élément du site</h1>

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

      <!-- Type -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type *</label>
        <select
          id="type"
          v-model="form.type"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        >
          <option value="">Sélectionnez un type</option>
          <option value="banniere">Bannière</option>
          <option value="bloc">Bloc de contenu</option>
          <option value="formulaire">Formulaire</option>
          <option value="galerie">Galerie d’images</option>
        </select>
      </div>

      <!-- Catégorie de site -->
      <div>
        <label for="site_element_categorie_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie *</label>
        <select
          id="site_element_categorie_id"
          v-model="form.site_element_categorie_id"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option v-for="cat in siteCategories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Images -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Images (facultatif, mais requis pour les bannières/galeries)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8192C] file:text-white hover:file:bg-red-700"
        />
        <!-- Prévisualisation -->
        <div v-if="previewUrls.length" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div v-for="(url, index) in previewUrls" :key="index" class="relative group">
            <img :src="url" alt="Preview" class="w-full h-24 object-cover rounded border" />
            <button
              type="button"
              @click="removeImage(index)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Contenu -->
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contenu *</label>
        <textarea
          id="content"
          v-model="form.content"
          rows="4"
          required
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
          Enregistrer l'élément
        </button>
        <NuxtLink
          to="/admin/site-elements"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

definePageMeta({
    layout: 'admin'
})

const siteCategories = [
  { id: 1, name: 'Accueil' },
  { id: 2, name: 'Témoignages' },
  { id: 3, name: 'Footer' },
  { id: 4, name: 'Bannières' }
]

const form = reactive({
  name: '',
  type: '',
  site_element_categorie_id: null,
  content: '',
  status: 'active',
  images: [] // Stocke les fichiers File
})

const previewUrls = ref([])

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  form.images = files

  // Génère des URLs de prévisualisation
  previewUrls.value = files.map(file => URL.createObjectURL(file))
}

const removeImage = (index) => {
  const newImages = [...form.images]
  newImages.splice(index, 1)
  form.images = newImages
  previewUrls.value = newImages.map(file => URL.createObjectURL(file))
}

const submit = () => {
  if (!form.name || !form.type || !form.site_element_categorie_id || !form.content) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  // Si type = banniere ou galerie, vérifie qu’au moins une image est présente
  if ((form.type === 'banniere' || form.type === 'galerie') && form.images.length === 0) {
    alert('Ce type d’élément nécessite au moins une image.')
    return
  }

  console.log('Nouvel élément du site:', {
    ...form,
    images: form.images.map(f => f.name) // Pour le log, tu enverras les fichiers via FormData
  })
  alert('Élément ajouté avec succès !')
}
</script>