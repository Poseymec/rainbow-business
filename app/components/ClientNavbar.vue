<template>
  <nav
    class="bg-white/50 backdrop-blur border-b border-gray-200/40 dark:bg-gray-900/50 dark:border-gray-700/40 fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-md shadow-black/25 dark:shadow-black/70 transition-all duration-300"
  >
    <div class="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink :to="localePath('/')" class="flex items-center space-x-2 rtl:space-x-reverse z-10">
        <img src="/images/logo.png" class="h-10" alt="Logo" />
      </NuxtLink>

      <!-- Menu mobile / desktop -->
      <div
        :class="[
          'absolute left-1/2 top-full -translate-x-1/2 pt-2 w-full md:static md:block md:pt-0 md:translate-x-0 md:w-auto md:left-0 transition-all duration-300 ease-in-out z-40 md:z-auto',
          { hidden: !isMenuOpen }
        ]"
        id="navbar-mobile"
      >
        <ul
          class="flex flex-col md:flex-row justify-center items-center md:space-x-4 font-medium p-2 md:p-0 rounded-xl bg-gray-50/95 backdrop-blur-md md:bg-transparent dark:bg-gray-800/50 md:dark:bg-transparent border border-gray-100/40 md:border-0 dark:border-gray-700/40 w-full md:w-auto"
        >
          <li v-for="item in navItems" :key="item.id" class="w-full md:w-auto">
            <NuxtLink
              :to="getLink(item)"
              :class="[
                'font-sans block py-2 px-3 rounded-lg transition-colors duration-200 text-center w-full text-lg font-medium',
                'hover:bg-gray-100/70 md:hover:bg-transparent md:hover:text-red-600 dark:text-gray-200 md:dark:hover:text-red-400 dark:hover:bg-gray-700/70 dark:hover:text-white md:dark:hover:bg-transparent',
                isActive(item) ? 'text-red-600 dark:text-red-400 font-bold' : ''
              ]"
              @click="closeMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contrôles (langue + thème + menu mobile) -->
      <div class="flex items-center gap-2 z-10">
        <LocaleSelector class="text-sm" />
        <ThemeSelector class="text-sm" />
        <button
          @click="toggleMenu"
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

import LocaleSelector from '~/components/LocaleSelector.vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import { IconMenu2, IconX } from '@tabler/icons-vue'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const isMenuOpen = ref(false)
const activeSection = ref('hero')

// --- NAVIGATION ITEMS ---
// On distingue clairement :
// - `page`: la route de base (utilisée pour la comparaison)
// - `anchor`: l'ancre optionnelle (seulement pour la home)
const navItems = computed(() => [
  { id: 'home', page: '/', anchor: null, label: t('home-nav') },
  { id: 'about', page: '/', anchor: 'about', label: t('about') },
  { id: 'services', page: '/', anchor: 'services', label: t('services') },
  { id: 'contact', page: '/', anchor: 'contact', label: t('contact') },
  { id: 'product', page: '/product', anchor: null, label: t('product') }
])

// --- FERMETURE MENU ---
const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// --- GÉNÉRATION DU LIEN ---
const getLink = (item: { page: string; anchor: string | null }) => {
  const base = localePath(item.page)
  if (item.page === '/' && item.anchor) {
    return `${base}#${item.anchor}`
  }
  return base
}

// --- DÉTECTION DE L'ÉLÉMENT ACTIF ---
const isActive = (item: { page: string; anchor: string | null }): boolean => {
  const currentLocalizedHome = localePath('/')
  
  // Cas 1 : on est sur la page d'accueil (ex: /fr)
  if (route.path === currentLocalizedHome) {
    if (item.page !== '/') return false
    
    // Accueil sans ancre → actif si on est en haut (hero)
    if (!item.anchor) {
      return activeSection.value === 'hero'
    }
    
    // Ancres → actif si la section correspond
    return activeSection.value === item.anchor
  }

  // Cas 2 : on est sur une autre page → comparaison exacte
  return route.path === localePath(item.page)
}

// --- SCROLLSPY POUR LA PAGE D'ACCUEIL ---
const updateActiveSection = () => {
  const currentLocalizedHome = localePath('/')
  if (route.path !== currentLocalizedHome) return

  const sections = ['hero', 'about', 'services', 'contact']
  const scrollY = window.scrollY + 100 // offset pour déclencher plus tôt

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollY >= top && scrollY < top + height) {
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

// --- ÉCOUTEURS ---
onMounted(() => {
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  // Lancer une première fois au montage (au cas où on arrive déjà scrollé)
  setTimeout(updateActiveSection, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})

// Met à jour la section active après navigation (ex: clic sur #contact)
watch(
  () => route.fullPath,
  () => {
    const currentLocalizedHome = localePath('/')
    if (route.path === currentLocalizedHome) {
      setTimeout(updateActiveSection, 300)
    }
  },
  { immediate: true }
)
</script>