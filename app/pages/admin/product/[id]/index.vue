<!-- app/pages/admin/products/[id].vue -->
<template>
  <div class="max-w-4xl mx-auto p-6">
    <NuxtLink to="/admin/product" class="inline-flex items-center text-[#E8192C] hover:text-red-700 mb-6">
      ← Retour à la liste
    </NuxtLink>

    <div v-if="product" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ product.name }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">ID: {{ product.id }}</p>

      <div class="mb-6">
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            product.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          ]"
        >
          {{ product.status === 'active' ? 'Actif' : 'Inactif' }}
        </span>
      </div>

      <div v-if="product.images && product.images.length" class="mb-8">
        <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-3">Images</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            v-for="(img, i) in product.images"
            :key="i"
            :src="img.url"
            class="w-full h-32 object-cover rounded border"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Catégorie</h3>
          <p class="text-gray-900 dark:text-white">{{ product.categorie?.name || '—' }}</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Prix</h3>
          <p class="text-gray-900 dark:text-white">
            {{ product.prix?.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
          </p>
        </div>
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Description courte</h3>
          <p class="text-gray-900 dark:text-white">{{ product.description1 || '—' }}</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Description longue</h3>
          <p class="text-gray-900 dark:text-white">{{ product.description2 || '—' }}</p>
        </div>
      </div>

      <div class="flex justify-end">
        <NuxtLink
          :to="`/admin/product/${product.id}/edit`"
          class="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg"
        >
          ✏️ Modifier
        </NuxtLink>
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <p>Chargement du produit...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

onMounted(() => {
  const mock = {
    id: route.params.id,
    name: 'Imprimante Laser Pro X500',
    status: 'active',
    prix: 299900,
    description1: 'Vitesse d’impression rapide',
    description2: 'Faible coût par page',
    images: [
      { id: 1, url: 'https://placehold.co/300x300?text=Produit1' },
      { id: 2, url: 'https://placehold.co/300x300?text=Produit2' }
    ],
    categorie: { id: 1, name: 'Imprimantes' }
  }
  product.value = mock
})
definePageMeta({
    layout: 'admin'
})
</script>