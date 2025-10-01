import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  // ✅ Safe : ne lit localStorage que quand on l'appelle côté client
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        token.value = storedToken
        // Optionnel : fetch user ici si besoin
      }
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<LoginResponse>('/api/login', {
        method: 'POST',
        body: credentials
      })
      token.value = response.token
      user.value = response.user
      if (process.client) {
        localStorage.setItem('auth_token', response.token)
      }
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur de connexion'
      if (process.client) {
        localStorage.removeItem('auth_token')
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    error.value = null
    if (process.client) {
      localStorage.removeItem('auth_token')
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    loading,
    error,
    initAuth,
    login,
    logout
  }
})