<!-- app/pages/admin/sliders/[id].vue -->
<template>
  <div class="max-w-2xl mx-auto p-6">
    <NuxtLink to="/admin/slider" class="inline-flex items-center text-[#E8192C] hover:text-red-700 mb-6">
      ← Retour à la liste
    </NuxtLink>

    <div v-if="slider" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ slider.name }}</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">ID: {{ slider.id }}</p>

      <div v-if="slider.photoUrl" class="mb-8">
        <img :src="slider.photoUrl" :alt="slider.name" class="w-full h-64 object-cover rounded-lg shadow" />
      </div>

      <div v-if="slider.description" class="mb-8">
        <h3 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h3>
        <p class="text-gray-900 dark:text-white">{{ slider.description }}</p>
      </div>

      <div class="mb-8">
        <span
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            slider.status === 'active'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          ]"
        >
          {{ slider.status === 'active' ? 'Actif' : 'Inactif' }}
        </span>
      </div>

      <div class="flex justify-end">
        <NuxtLink
          :to="`/admin/slider/${slider.id}/edit`"
          class="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg"
        >
          ✏️ Modifier
        </NuxtLink>
      </div>
    </div>

    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
      <p>Chargement du slider...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slider = ref(null)

onMounted(() => {
  const mock = {
    id: route.params.id,
    name: 'Slider Accueil 1',
    photoUrl: 'https://placehold.co/800x400?text=Slider',
    description: 'Nouvelle collection printemps',
    status: 'active'
  }
  slider.value = mock
})
definePageMeta({
    layout: 'admin'
})
</script>