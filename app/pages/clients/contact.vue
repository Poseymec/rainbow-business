<template>
  <section class="py-16 px-4">
     <h2 class="mb-6 text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white tracking-tight">
          Contactez-nous
        </h2>
        <p class="mb-10 text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Une question ? Un projet ? Besoin d’aide ? Remplissez le formulaire ci-dessous.
        </p>
    <!-- Conteneur principal avec fond transparent et effet verre -->
    <div class="max-w-screen-md mx-auto backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
      
      <!-- Formulaire de contact -->

      <div class="mb-12">
       
        <form @submit.prevent="submitContact" class="space-y-8">
          <!-- Nom -->
          <div>
            <label for="name" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Votre nom *
            </label>
            <input
              type="text"
              id="name"
              v-model="contactForm.name"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#E8192C] focus:border-[#E8192C] block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="John Doe"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Votre email *
            </label>
            <input
              type="email"
              id="email"
              v-model="contactForm.email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#E8192C] focus:border-[#E8192C] block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="votre@email.com"
              required
            />
          </div>

          <!-- Téléphone -->
          <div>
            <label for="phone" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Votre téléphone
            </label>
            <input
              type="tel"
              id="phone"
              v-model="contactForm.phone"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#E8192C] focus:border-[#E8192C] block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="+225 XX XX XX XX"
            />
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-400">
              Votre message *
            </label>
            <textarea
              id="message"
              rows="7"
              v-model="contactForm.message"
              class="block p-4 w-full text-base text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-[#E8192C] focus:border-[#E8192C] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="Écrivez votre message ici..."
              required
            ></textarea>
          </div>

          <!-- Bouton d'envoi -->
          <button
            type="submit"
            class="w-full py-4 px-6 text-base font-bold text-center text-white rounded-lg bg-[#E8192C] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-[#E8192C] dark:hover:bg-red-600 dark:focus:ring-red-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            Envoyer le message
          </button>
        </form>
      </div>

      <!-- Section Newsletter -->
      <div class="border-t border-gray-300 dark:border-gray-600 pt-10">
        <h3 class="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
          Restez informé(e) 📩
        </h3>
        <p class="mb-8 text-center text-gray-600 dark:text-gray-400 text-lg">
          Inscrivez-vous à notre newsletter pour recevoir nos offres et nouveautés.
        </p>
        <form @submit.prevent="submitNewsletter" class="space-y-6 max-w-md mx-auto">
          <div>
            <label for="newsletter-email" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Votre email *
            </label>
            <input
              type="email"
              id="newsletter-email"
              v-model="newsletterForm.email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#E8192C] focus:border-[#E8192C] block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="votre@email.com"
              required
            />
          </div>
          <div>
            <label for="newsletter-phone" class="block mb-3 text-lg font-medium text-gray-900 dark:text-gray-300">
              Votre téléphone (optionnel)
            </label>
            <input
              type="tel"
              id="newsletter-phone"
              v-model="newsletterForm.phone"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-[#E8192C] focus:border-[#E8192C] block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E8192C] dark:focus:border-[#E8192C]"
              placeholder="+225 XX XX XX XX"
            />
          </div>
          <button
            type="submit"
            class="w-full py-4 px-6 text-base font-bold text-center text-white rounded-lg bg-[#E8192C] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-[#E8192C] dark:hover:bg-red-600 dark:focus:ring-red-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            S’inscrire à la newsletter
          </button>
        </form>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Formulaire de contact
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// Formulaire newsletter
const newsletterForm = ref({
  email: '',
  phone: ''
})

// Méthodes
const submitContact = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }
  alert('Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.')
  console.log('Contact:', contactForm.value)
  contactForm.value = { name: '', email: '', phone: '', message: '' }
}

const submitNewsletter = () => {
  if (!newsletterForm.value.email) {
    alert('Veuillez entrer votre email.')
    return
  }
  alert('Merci pour votre inscription ! Vous recevrez bientôt nos nouveautés.')
  console.log('Newsletter:', newsletterForm.value)
  newsletterForm.value = { email: '', phone: '' }
}
</script>