<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import { definePageMeta } from '#imports'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore() // ✅ OK ici car page publique, mais on ne lit pas localStorage au setup
const router = useRouter()
const form = reactive({ email: '', password: '' })

const login = async () => {
  try {
    await authStore.login(form)
    router.push('/admin/product')
  } catch (err) {
    alert('Erreur : ' + authStore.error)
  }
}

import { onMounted } from 'vue'

onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/admin/product')
  }
})
</script>
<!-- app/pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div>
        <img class="mx-auto h-12 w-auto" src="/images/logo.png" alt="Logo" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-[#E8192C]">
          Connectez-vous à votre compte
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
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
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mot de passe</label>
              
            </div>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E8192C] focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#E8192C] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E8192C] transition-colors"
          >
            Se connecter
          </button>
        </div>
      </form>
      <div class="text-sm">
        <NuxtLink to="/forgot-password" class="font-medium text-[#E8192C] hover:text-red-700">
             Mot de passe oublié ?
        </NuxtLink>
        </div>
      <div class="text-center mt-6">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Vous n’avez pas de compte ?
          <NuxtLink to="/register" class="font-medium text-[#E8192C] hover:text-red-700">
            S’inscrire
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
