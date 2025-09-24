<!-- app/pages/admin/products/create.vue -->
<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold text-red-600 mb-6">Ajouter un produit</h1>

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
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Description 1 & 2 -->
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

      <!-- Images -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images du produit</label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleImageUpload"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E8192C] file:text-white hover:file:bg-red-700"
        />
        <p class="mt-1 text-xs text-gray-500">PNG, JPG jusqu’à 5 Mo</p>
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
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#E8192C]"
          ></div>
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
          Enregistrer le produit
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
import { reactive } from 'vue'

definePageMeta({
    layout: 'admin'
})

// Mock de catégories (à remplacer par un appel API)
const categories = [
  { id: 1, name: 'Imprimantes' },
  { id: 2, name: 'Scanners' },
  { id: 3, name: 'Consommables' }
]

const form = reactive({
  name: '',
  categorie_id: null,
  description1: '',
  description2: '',
  prix: null,
  status: 'active',
  images: []
})

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files)
  form.images = files // Tu peux les envoyer via FormData plus tard
}

const submit = () => {
  if (!form.name || !form.categorie_id || !form.prix) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }
  console.log('Nouveau produit:', form)
  alert('Produit ajouté avec succès !')
}
</script>