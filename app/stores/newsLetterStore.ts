// ~/stores/subscriberStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
export interface Subscriber {
  id: number
  email: string
  phone: string | null
  created_at?: string
}

export const useNewsLetterStore = defineStore('subscriber', () => {
  const subscribers = ref<Subscriber[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()

  const fetchSubscribers = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Subscriber[]>(`${config.public.apiBase}/api/newsletters`, {
        credentials: 'include'
      })
      subscribers.value = data
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors du chargement des abonnés'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createSubscriber = async (subscriber: { email: string; phone?: string }) => {
    loading.value = true
    error.value = null
    try {
      const newSubscriber = await $fetch<Subscriber>(`${config.public.apiBase}/api/newsletters`, {
        method: 'POST',
        body: subscriber,
        credentials: 'include'
      })
      subscribers.value.push(newSubscriber)
      return newSubscriber
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de l’inscription'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSubscriber = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${config.public.apiBase}/api/newsletters/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      subscribers.value = subscribers.value.filter(s => s.id !== id)
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    subscribers: computed(() => subscribers.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    fetchSubscribers,
    createSubscriber,
    deleteSubscriber
  }
})