<!-- app/pages/forgot-password.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 ">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/logo.png" alt="Logo" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Réinitialiser votre mot de passe
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="sendResetLink">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8192C] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="votre@email.com"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#E8192C] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8192C] transition-colors"
          >
            Envoyer le lien de réinitialisation
          </button>
        </div>
      </form>
      <div class="text-center mt-6">
        <NuxtLink to="/login" class="font-medium text-[#E8192C] hover:text-red-700">
          ← Retour à la connexion
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: ''
})

const sendResetLink = () => {
  if (!form.email) {
    alert('Veuillez entrer votre email.')
    return
  }
  console.log('Lien de réinitialisation envoyé à:', form.email)
  alert('Un lien de réinitialisation a été envoyé à votre email.')
  // À connecter à ton API (ex: /api/forgot-password)
}
definePageMeta({
    layout: 'auth'
})
</script>