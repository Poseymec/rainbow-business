export default defineNuxtRouteMiddleware((to) => {
  // Laisse passer en SSR, vérifie côté client
  if (process.server) return

  const authStore = useAuthStore()
  authStore.initAuth()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})