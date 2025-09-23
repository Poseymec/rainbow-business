<script setup>
import { ref } from 'vue'

const ContactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (!ContactForm.value.name || !ContactForm.value.email || !ContactForm.value.message) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }
  emit('submit', ContactForm.value)
  ContactForm.value = { name: '', email: '', phone: '', message: '' }
}
</script>

<template>
  <div>
    <h2 class="mb-6 text-4xl font-bold text-center text-red-600 dark:text-red-400">
      Contactez-nous
    </h2>
    <p class="mb-10 text-center text-gray-700 dark:text-gray-300 text-lg">
      Remplissez le formulaire ci-dessous.
    </p>
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div>
        <label for="name" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre nom *
        </label>
        <input
          type="text"
          id="name"
          v-model="ContactForm.name"
          required
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div>
        <label for="email" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre email *
        </label>
        <input
          type="email"
          id="email"
          v-model="ContactForm.email"
          required
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div>
        <label for="phone" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre téléphone
        </label>
        <input
          type="tel"
          id="phone"
          v-model="ContactForm.phone"
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
      <div>
        <label for="message" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
          Votre message *
        </label>
        <textarea
          id="message"
          rows="7"
          v-model="ContactForm.message"
          required
          class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full py-4 text-base font-bold text-white bg-red-600 rounded-lg hover:bg-red-700"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>