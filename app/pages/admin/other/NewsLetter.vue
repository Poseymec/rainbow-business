<!-- app/pages/admin/newsletter/index.vue -->
<template>
  <div class="p-4">
    <h1 class="text-xl md:text-2xl font-bold text-red-600 mb-6">Abonnés à la newsletter</h1>

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
        v-for="sub in filteredSubscribers"
        :key="sub.id"
        class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border"
      >
        <p class="font-bold text-gray-900 dark:text-white">{{ sub.email }}</p>
        <p v-if="sub.phone" class="text-sm text-gray-600 dark:text-gray-300">Tél : {{ sub.phone }}</p>
        <div class="mt-3">
          <button @click="deleteSubscriber(sub.id)" class="px-3 py-1 bg-red-600 text-white text-xs rounded">
            🗑️ Désabonner
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-400 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-600">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Téléphone</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          <tr v-for="sub in filteredSubscribers" :key="sub.id">
            <td class="px-4 py-4 text-sm text-gray-900 dark:text-white">{{ sub.email }}</td>
            <td class="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">{{ sub.phone || '—' }}</td>
            <td class="px-4 py-4 text-sm">
              <button @click="deleteSubscriber(sub.id)" class="px-3 py-1 bg-red-600 text-white text-xs rounded">
                🗑️ Désabonner
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const subscribers = ref([
  { id: 1, email: 'user@example.com', phone: '+225 01 23 45 67' }
])

const searchTerm = ref('')
const filteredSubscribers = computed(() => {
  return subscribers.value.filter(s => s.email.toLowerCase().includes(searchTerm.value.toLowerCase()))
})

const deleteSubscriber = (id) => {
  if (confirm('Désabonner ?')) subscribers.value = subscribers.value.filter(s => s.id !== id)
}
definePageMeta({
  layout: 'admin'
})
</script>