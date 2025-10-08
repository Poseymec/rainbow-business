
<template>
  <nav
    class="bg-white/50 backdrop-blur border-b border-gray-200/40 dark:bg-gray-900/50 dark:border-gray-700/40 fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-md shadow-black/25 dark:shadow-black/70 transition-all duration-300"
  >
    <div class="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse z-10">
        <img src="/images/logo.png" class="h-15" alt="Logo" />
      </NuxtLink>

      <!-- Menu -->
      <div
        :class="{ 'hidden': !isMenuOpen }"
        class="absolute left-1/2 top-full -translate-x-1/2 pt-2 w-full md:static md:block md:pt-0 md:translate-x-0 md:w-auto md:left-0 transition-all duration-300 ease-in-out z-40 md:z-auto"
        id="navbar-mobile"
      >
        <ul
          class="flex flex-col md:flex-row justify-center items-center md:space-x-4 font-medium p-2 md:p-0 rounded-xl bg-gray-50/95 backdrop-blur-md md:bg-transparent dark:bg-gray-800/50 md:dark:bg-transparent border border-gray-100/40 md:border-0 dark:border-gray-700/40 w-full md:w-auto"
        >
          <li v-for="item in navItems" :key="item.to" class="w-full md:w-auto">
            <NuxtLink
              :to="item.to"
              :class="[
                ' font-sans  block py-2 px-3 rounded-lg hover:bg-gray-100/70 md:hover:bg-transparent md:hover:text-red-600 dark:text-gray-200 md:dark:hover:text-red-400 dark:hover:bg-gray-700/70 dark:hover:text-white md:dark:hover:bg-transparent transition-colors duration-200 text-center w-full text-lg font-medium',
                isItemActive(item) ? 'text-red-600 dark:text-red-400' : ''
              ]"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contrôles -->
      <div class="flex items-center gap-2 z-10">
        <LocaleSelector class="text-sm" />
        <ThemeSelector class="text-sm" />
        <button
          @click="isMenuOpen = !isMenuOpen"
          type="button"
          class="inline-flex items-center p-2 w-8 h-8 justify-center text-red-400 rounded-lg md:hidden hover:bg-red-100/70 focus:outline-none focus:ring-2 focus:ring-esd-300/50 dark:text-red-300 dark:hover:bg-red-700/70 dark:focus:ring-red-600/50 transition-colors duration-200"
          aria-label="Toggle main menu"
        >
          <span class="sr-only">Menu</span>
          <IconMenu2 v-if="!isMenuOpen" class="w-5 h-5" />
          <IconX v-else class="w-5 h-5" />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router' // ⚠️ Important : 'vue-router', pas '#imports' pour useRoute
import { useI18n } from 'vue-i18n'
import LocaleSelector from '~/components/LocaleSelector.vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import { IconMenu2, IconX } from '@tabler/icons-vue'

const { t } = useI18n()
const route = useRoute()
const isMenuOpen = ref(false)
const activeSection = ref('hero') // pour le scrollspy

// Liste des items de navigation
const navItems = computed(() => [
  { to: '/', label: t('home-nav'), section: 'hero', route: '/' },
  { to: '/#about', label: t('about'), section: 'about', route: '/' },
  { to: '/#services', label: t('services'), section: 'services', route: '/' },
  { to: '/#contact', label: t('contact'), section: 'contact', route: '/' },
  { to: '/product', label: t('product'), section: null, route: '/product' }
])

// Fonction pour savoir si un item est actif
const isItemActive = (item) => {
  // Cas 1 : on est sur une page autre que l'accueil → comparaison classique
  if (route.path !== '/') {
    return route.path === item.route
  }

  // Cas 2 : on est sur la page d'accueil → utiliser le scrollspy
  return activeSection.value === item.section
}

// --- Scrollspy (uniquement sur /) ---
const updateActiveSection = () => {
  if (route.path !== '/') return

  const sections = ['hero', 'about', 'services', 'contact']
  const scrollPosition = window.scrollY + 100 // offset pour meilleure détection

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = id
        return
      }
    }
  }

  // Si on est tout en haut
  if (window.scrollY < 100) {
    activeSection.value = 'hero'
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  // Initialisation au chargement
  setTimeout(updateActiveSection, 150)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})

// Réagir aux changements de route (ex: arrivée via /#contact ou /product)
watch(
  () => route.fullPath,
  () => {
    if (route.path === '/') {
      // Attendre que Nuxt ait scrollé vers l'ancre
      setTimeout(updateActiveSection, 300)
    }
    // Pas besoin de gérer autre chose : isItemActive() s'adapte
  },
  { immediate: true }
)
</script>