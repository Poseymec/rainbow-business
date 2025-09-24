<!-- app/pages/admin/contact/index.vue -->
<template>
  <div class="p-4">
    <h1 class="text-xl md:text-2xl font-bold text-red-600 mb-6">Messages de contact</h1>

    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Rechercher..."
        class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#E8192C] dark:bg-gray-800 dark:border-gray-700"
      />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-4">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border"
      >
        <p class="font-bold text-gray-900 dark:text-white">{{ msg.name }}</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ msg.email }}</p>
        <p class="text-sm font-medium text-gray-800 dark:text-white">{{ msg.subject }}</p>
        <p class="mt-2 text-sm text-gray-700 dark:text-gray-300">{{ msg.message }}</p>
        <div class="mt-3 flex gap-2">
          <button @click="viewMessage(msg)" class="px-2 py-1 bg-blue-600 text-white text-xs rounded">👁️</button>
          <button @click="deleteMessage(msg.id)" class="px-2 py-1 bg-red-600 text-white text-xs rounded">🗑️</button>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-600">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Nom</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Sujet</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Message</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="msg in filteredMessages" :key="msg.id">
            <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ msg.name }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{{ msg.email }}</td>
            <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ msg.subject }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{{ msg.message }}</td>
            <td class="px-4 py-4 text-sm space-x-2">
              <button @click="viewMessage(msg)" class="px-2 py-1 bg-blue-600 text-white text-xs rounded">👁️</button>
              <button @click="deleteMessage(msg.id)" class="px-2 py-1 bg-red-600 text-white text-xs rounded">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const messages = ref([
  { id: 1, name: 'Jean', email: 'jean@example.com', subject: 'Livraison', message: 'Bonjour, ma commande...' }
])

const searchTerm = ref('')
const filteredMessages = computed(() => {
  return messages.value.filter(m =>
    m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

const viewMessage = (msg) => alert(msg.message)
const deleteMessage = (id) => {
  if (confirm('Supprimer ?')) messages.value = messages.value.filter(m => m.id !== id)
}
definePageMeta({
  layout: 'admin'
})
</script>