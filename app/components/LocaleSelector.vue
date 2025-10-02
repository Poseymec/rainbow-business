<script setup>
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'
import { navigateTo } from 'nuxt/app'

const { locale: currentLocale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const toggleLocale = () => {
  const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr'
  setLocale(newLocale)
  navigateTo(switchLocalePath(newLocale))
}
</script>

<template>
  <button
    @click="toggleLocale"
    class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E8192C]"
    :aria-label="`Changer la langue vers ${currentLocale === 'fr' ? 'anglais' : 'français'}`"
  >
    {{ currentLocale === 'fr' ? 'FR' : 'EN' }}
  </button>
</template>