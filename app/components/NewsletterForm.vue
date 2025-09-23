<script setup>
import { ref } from 'vue'

const NewsletterForm = ref({
  email: '',
  phone: ''
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!NewsletterForm.value.email) {
    alert('Veuillez entrer votre email.')
    return
  }
  emit('submit', NewsletterForm.value)
  NewsletterForm.value = { email: '', phone: '' }
}
</script>

<template>
  <div>
    <h3 class="mb-6 text-3xl font-bold text-center text-red-600 dark:text-red-400">
      Newsletter 📩
    </h3>
    <p class="mb-8 text-center text-gray-700 dark:text-gray-300 text-lg">
      Recevez nos nouveautés.
    </p>
    <form @submit.prevent="handleSubmit" class="space-y-6 max-w-md mx-auto">
      <div>
        <label for="newsletter-email" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre email *
        </label>
        <input
          type="email"
          id="newsletter-email"
          v-model="NewsletterForm.email"
          required
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div>
        <label for="newsletter-phone" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="newsletter-phone"
          v-model="NewsletterForm.phone"
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        class="w-full py-4 text-base font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
      >
        S’inscrire
      </button>
    </form>
  </div>
</template>