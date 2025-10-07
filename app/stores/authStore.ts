// ~/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  token?: string // Sanctum n'utilise pas de JWT → on ne l'utilise pas
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Avec Sanctum, on ne stocke PAS le token → on utilise les cookies de session
  const isAuthenticated = computed(() => !!user.value)

  // Récupère l'utilisateur courant (vérifie la session)
  const fetchUser = async () => {
    if (!process.client) return

    loading.value = true
    try {
      const data = await $fetch<User>('/api/user', {
        credentials: 'include' // ⚠️ Très important pour les cookies
      })
      user.value = data
    } catch (err) {
      user.value = null
      if (process.client) {
        // Optionnel : clear localStorage si tu en utilises
      }
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/login', {
        method: 'POST',
        body: credentials,
        credentials: 'include' // Envoie les cookies de session
      })
      await fetchUser() // Met à jour l'utilisateur après login
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur de connexion'
      user.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    loading.value = true
    error.value = null
    try {
      await $fetch('/api/register', {
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
      await $fetch('/api/logout', {
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
      await $fetch('/api/forgot-password', {
        method: 'POST',
        body: { email }
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
      await $fetch('/api/reset-password', {
        method: 'POST',
        body: payload
      })
      await fetchUser() // Optionnel : auto-login après reset
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