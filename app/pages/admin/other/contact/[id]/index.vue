<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const router = useRouter()
const message = ref(null)

// ⚠️ Ici, on simule le chargement d’un message depuis une "base de données"
// Dans la vraie vie, tu utiliseras un store Pinia ou un appel API
const mockMessages = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+225 01 23 45 67',
    subject: 'Problème de livraison',
    message: 'Bonjour, ma commande n°12345 n’est toujours pas arrivée. Pouvez-vous vérifier ?',
    createdAt: '2025-04-01T10:30:00Z'
  },
  {
    id: 2,
    name: 'Marie Kouassi',
    email: 'marie.k@example.com',
    subject: 'Demande de devis',
    message: 'Je souhaiterais un devis pour 10 imprimantes laser. Merci de me contacter rapidement.',
    createdAt: '2025-04-03T14:20:00Z'
  }
]

onMounted(() => {
  const id = parseInt(route.params.id)
  message.value = mockMessages.find(m => m.id === id) || null
})

const goBack = () => router.push('/admin/other/contact')

const deleteMessage = () => {
  if (confirm('Voulez-vous supprimer ce message ?')) {
    // Dans la vraie vie : appeler un store ou une API
    alert('Message supprimé')
    goBack()
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="goBack"
        class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Retour à la liste"
      >
        <Icon icon="mdi:arrow-left" width="20" class="text-gray-700 dark:text-gray-300" />
      </button>
      <h1 class="text-2xl font-bold text-red-600">Détail du message</h1>
    </div>

    <div v-if="message" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <!-- En-tête -->
      <div class="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span class="font-medium text-gray-900 dark:text-white">{{ message.name }}</span>
          •
          <a :href="`mailto:${message.email}`" class="text-blue-600 hover:underline">{{ message.email }}</a>
          <span v-if="message.phone"> • {{ message.phone }}</span>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ message.subject }}</h2>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Reçu le {{ new Date(message.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
        </p>
      </div>

      <!-- Message -->
      <div class="prose prose-gray dark:prose-invert max-w-none">
        <p class="text-gray-800 dark:text-gray-200 whitespace-pre-line">{{ message.message }}</p>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex justify-end gap-3">
        <a
          :href="`mailto:${message.email}`"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:email-outline" width="18" />
          Répondre
        </a>
        <button
          @click="deleteMessage"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:delete" width="18" />
          Supprimer
        </button>
      </div>
    </div>

    <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
      Message non trouvé.
    </div>
  </div>
</template>