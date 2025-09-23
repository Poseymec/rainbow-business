<script setup>
import { ref } from 'vue'

// États des formulaires
const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const newsletterForm = ref({
  email: '',
  phone: ''
})

// Soumission du formulaire de contact
const submitContact = () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }
  alert('Merci ! Votre message a bien été envoyé.')
  console.log('Contact:', contactForm.value)
  contactForm.value = { name: '', email: '', phone: '', message: '' }
}

// Soumission de la newsletter
const submitNewsletter = () => {
  if (!newsletterForm.value.email) {
    alert('Veuillez entrer votre email.')
    return
  }
  alert('Merci pour votre inscription !')
  console.log('Newsletter:', newsletterForm.value)
  newsletterForm.value = { email: '', phone: '' }
}
</script>

<template>
  <section class="py-16 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Conteneur principal avec fond transparent -->
      <div class="backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50">

        <!-- 📱 Mobile : Newsletter en haut -->
        <div class="lg:hidden mb-12">
          <div>
            <h3 class="mb-6 text-3xl font-bold text-center text-red-600 dark:text-red-400">
              Restez informé(e) 📩
            </h3>
            <p class="mb-8 text-center text-gray-700 dark:text-gray-300 text-lg">
              Inscrivez-vous à notre newsletter pour recevoir nos offres et nouveautés.
            </p>
            <form @submit.prevent="submitNewsletter" class="space-y-6 max-w-md mx-auto">
              <div>
                <label for="newsletter-email" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre email *
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  v-model="newsletterForm.email"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label for="newsletter-phone" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  id="newsletter-phone"
                  v-model="newsletterForm.phone"
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <button
                type="submit"
                class="w-full py-4 text-base font-bold text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                S’inscrire à la newsletter
              </button>
            </form>
          </div>
        </div>

        <!-- 🖥️ Desktop : Contact + Newsletter côte à côte -->
        <div class="hidden lg:grid lg:grid-cols-2 lg:gap-12">
          <!-- Formulaire de contact -->
          <div>
            <h2 class="mb-6 text-4xl font-bold text-center text-red-600 dark:text-red-400">
              Contactez-nous
            </h2>
            <p class="mb-10 text-center text-gray-700 dark:text-gray-300 text-lg">
              Une question ? Un projet ? Besoin d’aide ? Remplissez le formulaire ci-dessous.
            </p>
            <form @submit.prevent="submitContact" class="space-y-8">
              <div>
                <label for="name" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="contactForm.name"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label for="email" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre email *
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="contactForm.email"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label for="phone" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  v-model="contactForm.phone"
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div>
                <label for="message" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre message *
                </label>
                <textarea
                  id="message"
                  rows="7"
                  v-model="contactForm.message"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full py-4 text-base font-bold text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          <!-- Newsletter -->
          <div>
            <h3 class="mb-6 text-3xl font-bold text-center text-red-600 dark:text-red-400">
              Restez informé(e) 📩
            </h3>
            <p class="mb-8 text-center text-gray-700 dark:text-gray-300 text-lg">
              Inscrivez-vous à notre newsletter pour recevoir nos offres et nouveautés.
            </p>
            <form @submit.prevent="submitNewsletter" class="space-y-6 max-w-md mx-auto">
              <div>
                <label for="newsletter-email-desktop" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre email *
                </label>
                <input
                  type="email"
                  id="newsletter-email-desktop"
                  v-model="newsletterForm.email"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label for="newsletter-phone-desktop" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre téléphone (optionnel)
                </label>
                <input
                  type="tel"
                  id="newsletter-phone-desktop"
                  v-model="newsletterForm.phone"
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <button
                type="submit"
                class="w-full py-4 text-base font-bold text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                S’inscrire à la newsletter
              </button>
            </form>
          </div>
        </div>

        <!-- 📱 Mobile : Formulaire de contact en bas -->
        <div class="lg:hidden">
          <div>
            <h2 class="mb-6 text-4xl font-bold text-center text-red-600 dark:text-red-400">
              Contactez-nous
            </h2>
            <p class="mb-10 text-center text-gray-700 dark:text-gray-300 text-lg">
              Une question ? Un projet ? Besoin d’aide ? Remplissez le formulaire ci-dessous.
            </p>
            <form @submit.prevent="submitContact" class="space-y-8">
              <div>
                <label for="name-mobile" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="name-mobile"
                  v-model="contactForm.name"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label for="email-mobile" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre email *
                </label>
                <input
                  type="email"
                  id="email-mobile"
                  v-model="contactForm.email"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label for="phone-mobile" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre téléphone
                </label>
                <input
                  type="tel"
                  id="phone-mobile"
                  v-model="contactForm.phone"
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="+225 XX XX XX XX"
                />
              </div>
              <div>
                <label for="message-mobile" class="block mb-3 text-lg font-medium text-red-600 dark:text-red-400">
                  Votre message *
                </label>
                <textarea
                  id="message-mobile"
                  rows="7"
                  v-model="contactForm.message"
                  required
                  class="w-full p-4 text-base border rounded-lg focus:ring-2 focus:ring-red-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Écrivez votre message ici..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full py-4 text-base font-bold text-center text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>