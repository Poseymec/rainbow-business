<!-- app/pages/reset-password.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/logo.png" alt="Logo" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-[#E8192C]">
          Nouveau mot de passe
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="resetPassword">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nouveau mot de passe</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmer</label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-3 px-4 bg-[#E8192C] text-white rounded-lg hover:bg-red-700 transition"
            :disabled="loading"
          >
            {{ loading ? 'Envoi...' : 'Réinitialiser' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'

definePageMeta({ layout: 'auth' })

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// ✅ 1. Résout l'erreur TS2345 : gère proprement le token (peut être undefined)
const getTokenFromQuery = (): string => {
  const token = route.query.token
  if (Array.isArray(token)) {
    return token[0] || ''
  }
  return token || ''
}

const token = ref<string>(getTokenFromQuery())
const loading = ref<boolean>(false) // ✅ 2. Déclare 'loading' → résout TS2339

const form = reactive({
  email: '',
  password: '',
  password_confirmation: ''
})

const resetPassword = async () => {
  if (form.password !== form.password_confirmation) {
    alert('Les mots de passe ne correspondent pas.')
    return
  }

  loading.value = true // ✅ Utilise loading
  try {
    await authStore.resetPassword({
      token: token.value,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation
    })
    alert('Mot de passe mis à jour !')
    router.push('/admin/product')
  } catch (err) {
    alert('Erreur : ' + authStore.error)
  } finally {
    loading.value = false // ✅ Utilise loading
  }
}
</script>