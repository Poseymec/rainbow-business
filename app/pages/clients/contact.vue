<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 mt-10 rounded-3xl shadow-xl transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <div
        class="backdrop-blur-lg bg-white/60 dark:bg-gray-900/60 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <!-- Titre principal -->
        <div class="text-center lg:text-left mb-10 lg:mb-12">
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#E8192C]">
            {{ t('contact_page.title') }}
          </h1>
          <p class="mt-3 text-gray-700 dark:text-gray-300">
            {{ t('contact_page.subtitle') }}
          </p>
        </div>

        <!-- Grille responsive -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <!-- 📩 Newsletter -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3 mb-5">
              <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Icon icon="mdi:newspaper-variant-multiple" width="24" class="text-[#E8192C] dark:text-red-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ t('contact_page.newsletter.title') }}
              </h2>
            </div>
            <p class="mb-6 text-gray-700 dark:text-gray-300">
              {{ t('contact_page.newsletter.description') }}
            </p>
            <form @submit.prevent="submitNewsletter" class="space-y-5">
              <div>
                <label for="newsletter-email" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                  {{ t('contact_page.newsletter.email_label') }}
                </label>
                <input
                  id="newsletter-email"
                  v-model="newsletterForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                  :placeholder="t('contact_page.newsletter.email_label').replace(' *', '')"
                />
              </div>
              <div>
                <label for="newsletter-phone" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                  {{ t('contact_page.newsletter.phone_label') }}
                </label>
                <input
                  id="newsletter-phone"
                  v-model="newsletterForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                  :placeholder="t('contact_page.newsletter.phone_label')"
                />
              </div>
              <button
                type="submit"
                class="w-full py-3 font-bold text-white bg-[#E8192C] rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ t('contact_page.newsletter.submit_button') }}
              </button>
            </form>
          </div>

          <!-- ✉️ Contact -->
          <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center gap-3 mb-5">
              <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Icon icon="mdi:email-fast" width="24" class="text-[#E8192C] dark:text-red-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                {{ t('contact_page.contact.title') }}
              </h2>
            </div>
            <p class="mb-6 text-gray-700 dark:text-gray-300">
              {{ t('contact_page.contact.description') }}
            </p>
            <form @submit.prevent="submitContact" class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="name" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                    {{ t('contact_page.contact.name_label') }}
                  </label>
                  <input
                    id="name"
                    v-model="contactForm.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                    :placeholder="t('contact_page.contact.name_label').replace(' *', '')"
                  />
                </div>
                <div>
                  <label for="email" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                    {{ t('contact_page.contact.email_label') }}
                  </label>
                  <input
                    id="email"
                    v-model="contactForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                    :placeholder="t('contact_page.contact.email_label').replace(' *', '')"
                  />
                </div>
              </div>
              <div>
                <label for="phone" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                  {{ t('contact_page.contact.phone_label') }}
                </label>
                <input
                  id="phone"
                  v-model="contactForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                  :placeholder="t('contact_page.contact.phone_label')"
                />
              </div>
              <div>
                <label for="message" class="block mb-2 font-medium text-[#E8192C] dark:text-red-400">
                  {{ t('contact_page.contact.message_label') }}
                </label>
                <textarea
                  id="message"
                  v-model="contactForm.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C]"
                  :placeholder="t('contact_page.contact.message_label').replace(' *', '')"
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full py-3 font-bold text-white bg-[#E8192C] rounded-lg hover:bg-red-700 transition-colors"
              >
                {{ t('contact_page.contact.submit_button') }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { useNewsLetterStore } from '~/stores/newsLetterStore'
import { useContactStore } from '~/stores/contactStore'

const { t } = useI18n()

// ✅ Noms conformes à la convention Pinia
const subscriberStore = useNewsLetterStore()
const contactMessageStore = useContactStore()

// Formulaires
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
const submitContact = async () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    alert(t('contact_page.alerts.contact_missing_fields'))
    return
  }

  try {
    // 🔑 Ajout de `subject` pour correspondre au type attendu
    await contactMessageStore.createMessage({
      ...contactForm.value,
      subject: 'Message depuis le formulaire de contact' // ou toute autre valeur par défaut
    })

    alert(t('contact_page.alerts.contact_success'))
    // Réinitialisation
    contactForm.value = { name: '', email: '', phone: '', message: '' }
  } catch (err: any) {
    alert(err.message || t('contact_page.alerts.contact_error'))
  }
}

// Soumission de la newsletter
const submitNewsletter = async () => {
  if (!newsletterForm.value.email) {
    alert(t('contact_page.alerts.newsletter_missing_email'))
    return
  }

  try {
    await subscriberStore.createSubscriber(newsletterForm.value)
    alert(t('contact_page.alerts.newsletter_success'))
    newsletterForm.value = { email: '', phone: '' }
  } catch (err: any) {
    alert(err.message || t('contact_page.alerts.newsletter_error'))
  }
}
</script>