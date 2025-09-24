<!-- app/pages/admin/site-elements/[id]/index.vue -->
<template>
  <div class="max-w-4xl mx-auto p-6">
    <NuxtLink to="/admin/site-element" class="inline-flex items-center text-[#E8192C] hover:text-red-700 mb-6">
      ← Retour à la liste
    </NuxtLink>

    <!-- 🔷 Affiche uniquement si les données sont prêtes -->
    <div v-if="element" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ element.name }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">ID: {{ element.id }}</p>

      <!-- Statut -->
      <div class="mb-6">
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            element.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          ]"
        >
          {{ element.status === 'active' ? 'Actif' : 'Inactif' }}
        </span>
      </div>

      <!-- Images -->
      <div v-if="element.images && element.images.length" class="mb-6">
        <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Images</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <img
            v-for="(url, i) in element.images"
            :key="i"
            :src="url"
            class="w-full h-24 object-cover rounded border"
          />
        </div>
      </div>

      <!-- Infos -->
      <div class="space-y-4 mb-8">
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300">Type</h3>
          <p class="text-gray-900 dark:text-white">{{ element.type || '—' }}</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300">Catégorie</h3>
          <p class="text-gray-900 dark:text-white">{{ element.siteElementCategorie?.name || '—' }}</p>
        </div>
        <div>
          <h3 class="font-medium text-gray-700 dark:text-gray-300">Contenu</h3>
          <p class="text-gray-900 dark:text-white whitespace-pre-line">{{ element.content || '—' }}</p>
        </div>
      </div>

      <div class="flex justify-end">
        <NuxtLink
          :to="`/admin/site-element/${element.id}/edit`"
          class="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg"
        >
          ✏️ Modifier
        </NuxtLink>
      </div>
    </div>

    <!-- 🔷 Chargement ou erreur -->
    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <p>Chargement des données...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const element = ref(null)

onMounted(() => {
  // 🔁 Mock — remplace par un appel API réel
  const mockElement = {
    id: route.params.id,
    name: 'Bannière Accueil',
    type: 'banniere',
    status: 'active',
    content: 'Promotion -20% sur tous les produits',
    images: [
      'https://placehold.co/400x200?text=Bannière1',
      'https://placehold.co/400x200?text=Bannière2'
    ],
    siteElementCategorie: { id: 1, name: 'Accueil' }
  }
  element.value = mockElement
})
definePageMeta({
    layout: 'admin'
})
</script>