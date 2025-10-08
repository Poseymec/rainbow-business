<template>
  <div class="antialiased">
    <!-- Transition entre les pages -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<!-- app.vue -->
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})

onMounted(async () => {
  // Récupère le cookie CSRF (nécessaire pour Sanctum)
  await $fetch('/sanctum/csrf-cookie', {
    credentials: 'include'
  })
})
</script>

