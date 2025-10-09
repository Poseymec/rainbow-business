// ~/stores/contactMessageStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  created_at?: string
}

export const useContactStore = defineStore('contactMessage', () => {
  const messages = ref<ContactMessage[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const config = useRuntimeConfig()

  const fetchMessages = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<ContactMessage[]>(`${config.public.apiBase}/api/contacts`, {
        credentials: 'include'
      })
      messages.value = data
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors du chargement des messages'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const createMessage = async (message: { name: string; email: string; phone?: string; subject: string; message: string }) => {
    // Pas de credentials ici → c’est un formulaire public
    try {
      const newMessage = await $fetch<ContactMessage>(`${config.public.apiBase}/api/contacts`, {
        method: 'POST',
        body: message
        // ❌ Pas de credentials: 'include' → pas besoin d’auth pour envoyer un message
      })
      return newMessage
    } catch (err: any) {
      throw new Error(err.data?.message || 'Erreur lors de l’envoi du message')
    }
  }

  const deleteMessage = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      await $fetch(`${config.public.apiBase}/api/contacts/${id}`, {
        method: 'DELETE',
        credentials: 'include' // ✅ Suppression admin → besoin d’auth
      })
      messages.value = messages.value.filter(m => m.id !== id)
    } catch (err: any) {
      error.value = err.data?.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getMessageById = (id: number) => {
    return messages.value.find(m => m.id === id)
  }

  return {
    messages: computed(() => messages.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),

    fetchMessages,
    createMessage,
    deleteMessage,
    getMessageById
  }
})