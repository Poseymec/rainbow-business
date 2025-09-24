<!-- app/pages/admin/products/[id].vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Modifier le produit</h1>

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

      <!-- Catégorie -->
      <div>
        <label for="categorie_id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie *</label>
        <select
          id="categorie_id"
          v-model="form.categorie_id"
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id" :selected="cat.id === form.categorie_id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Descriptions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="description1" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description courte</label>
          <textarea
            id="description1"
            v-model="form.description1"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
          ></textarea>
        </div>
        <div>
          <label for="description2" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description longue</label>
          <textarea
            id="description2"
            v-model="form.description2"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
          ></textarea>
        </div>
      </div>

      <!-- Prix -->
      <div>
        <label for="prix" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prix (F CFA) *</label>
        <input
          id="prix"
          v-model.number="form.prix"
          type="number"
          required
          min="0"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
        />
      </div>

      <!-- Images actuelles -->
      <div v-if="existingImages.length">
        <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images actuelles</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div v-for="(img, index) in existingImages" :key="index" class="relative">
            <img :src="img.url" :alt="`Image ${index + 1}`" class="w-full h-24 object-cover rounded border" />
            <button
              type="button"
              @click="removeExistingImage(img.id)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      <!-- Nouvelles images -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ajouter de nouvelles images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleNewImageUpload"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8192C] file:text-white hover:file:bg-red-700"
        />
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
          Mettre à jour le produit
        </button>
        <NuxtLink
          to="/admin/products"
          class="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Annuler
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
definePageMeta({
    layout: 'admin'
})

const route = useRoute()

// Mock de données
const categories = [
  { id: 1, name: 'Imprimantes' },
  { id: 2, name: 'Scanners' }
]

const form = reactive({
  name: '',
  categorie_id: null,
  description1: '',
  description2: '',
  prix: null,
  status: 'active'
})

const existingImages = ref([])
const newImages = ref([])

onMounted(() => {
  // Simule le chargement du produit
  const mockProduct = {
    id: route.params.id,
    name: 'Imprimante Laser Pro X500',
    categorie_id: 1,
    description1: 'Vitesse rapide',
    description2: 'Faible coût par page',
    prix: 299.99,
    status: 'active',
    images: [
      { id: 1, url: 'https://placehold.co/100x100?text=Img1' },
      { id: 2, url: 'https://placehold.co/100x100?text=Img2' }
    ]
  }
  Object.assign(form, mockProduct)
  existingImages.value = mockProduct.images
})

const handleNewImageUpload = (event) => {
  newImages.value = Array.from(event.target.files)
}

const removeExistingImage = (id) => {
  existingImages.value = existingImages.value.filter(img => img.id !== id)
}

const submit = () => {
  if (!form.name || !form.categorie_id || !form.prix) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }
  console.log('Mise à jour du produit:', {
    id: route.params.id,
    ...form,
    existingImages: existingImages.value,
    newImages: newImages.value.map(f => f.name)
  })
  alert('Produit mis à jour avec succès !')
}
</script>