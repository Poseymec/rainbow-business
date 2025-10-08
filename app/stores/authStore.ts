// ~/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'

export interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()

  const isAuthenticated = computed(() => !!user.value)

  // ✅ Récupère le cookie CSRF
  const fetchCsrfToken = async () => {
    await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
      credentials: 'include'
    })
  }

  const fetchUser = async () => {
    if (!process.client) return

    loading.value = true
    try {
      const data = await $fetch<User>(`${config.public.apiBase}/api/user`, {
        credentials: 'include'
      })
      user.value = data
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = null
    try {
      await fetchCsrfToken() // ⚡ Obligatoire
      await $fetch(`${config.public.apiBase}/api/login`, {
        method: 'POST',
        body: credentials,
        credentials: 'include'
      })
      await fetchUser()
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur de connexion'
      user.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    loading.value = true
    error.value = null
    try {
      await fetchCsrfToken() // ⚡ Obligatoire
      await $fetch(`${config.public.apiBase}/api/register`, {
        method: 'POST',
        body: data,
        credentials: 'include'
      })
      await fetchUser()
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de l’inscription'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (!process.client) return
    try {
      await fetchCsrfToken() // ⚡ Obligatoire
      await $fetch(`${config.public.apiBase}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.warn('Erreur lors de la déconnexion', err)
    } finally {
      user.value = null
      error.value = null
    }
  }

  const forgotPassword = async (email: string) => {
    loading.value = true
    error.value = null
    try {
      await fetchCsrfToken()
      await $fetch(`${config.public.apiBase}/api/forgot-password`, {
        method: 'POST',
        body: { email },
        credentials: 'include'
      })
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de l’envoi du lien'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (payload: {
    token: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    loading.value = true
    error.value = null
    try {
      await fetchCsrfToken()
      await $fetch(`${config.public.apiBase}/api/reset-password`, {
        method: 'POST',
        body: payload,
        credentials: 'include'
      })
      await fetchUser()
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la réinitialisation'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    fetchUser,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
  }
})
