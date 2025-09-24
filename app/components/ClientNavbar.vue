<template>
  <nav
    class="bg-white/95 backdrop-blur border-b border-gray-200/40 dark:bg-gray-900/95 dark:border-gray-700/40 fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-md shadow-black/25 dark:shadow-black/70 transition-all duration-300"
  >
    <div class="max-w-screen-xl mx-auto px-3 py-2 flex items-center justify-between">
      <!-- Logo élégant -->
      <NuxtLink to="/" class="flex items-center space-x-2 rtl:space-x-reverse z-10">
        <img
          src="/images/logo.png"
          class="h-15"
          alt="Logo"
        />
       <!-- <span class="text-2XL font-medium whitespace-nowrap dark:text-red-500 tracking-tight">
          RBC
        </span>-->
      </NuxtLink>

      <!-- Menu CENTRÉ — version élégante -->
      <div
        :class="{ 'hidden': !isMenuOpen }"
        class="absolute left-1/2 top-full -translate-x-1/2 pt-2 w-full md:static md:block md:pt-0 md:translate-x-0 md:w-auto md:left-0 transition-all duration-300 ease-in-out z-40 md:z-auto"
        id="navbar-mobile"
      >
        <ul
          class="flex flex-col md:flex-row justify-center items-center md:space-x-4 font-medium p-2 md:p-0 rounded-xl bg-gray-50/95 backdrop-blur-md md:bg-transparent dark:bg-gray-800/95 md:dark:bg-transparent border border-gray-100/40 md:border-0 dark:border-gray-700/40 w-full md:w-auto"
        >
          <li v-for="item in navItems" :key="item.to" class="w-full md:w-auto">
            <NuxtLink
              :to="item.to"
              class="block py-2 px-3 rounded-lg hover:bg-gray-100/70 md:hover:bg-transparent md:hover:text-red-600 dark:text-gray-200 md:dark:hover:text-red-400 dark:hover:bg-gray-700/70 dark:hover:text-white md:dark:hover:bg-transparent transition-colors duration-200 text-center w-full text-sm font-medium"
              active-class="text-red-600 dark:text-red-400"
              @click="isMenuOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Contrôles TOUJOURS visibles + Hamburger -->
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LocaleSelector from '~/components/LocaleSelector.vue'
import ThemeSelector from '~/components/ThemeSelector.vue'
import { IconMenu2, IconX } from '@tabler/icons-vue'

const { t } = useI18n()
const isMenuOpen = ref(false)

const navItems = computed(() => [
  { to: '/', label: t('home') },
  { to: '/about', label: t('about') },
  { to: '/services', label: t('services') },
  { to: '/contact', label: t('contact') },
  { to: 'product/', label: t('product') }
])
</script>

<style scoped>
/*nav {
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(12px);
  animation: fadeInDown 0.3s ease-out;
}*/
av {
  -webkit-backdrop-filter: blur(32px) saturate(120%) brightness(1.5);
  backdrop-filter: blur(32px) saturate(10%) brightness(1.1);
  animation: fadeInDown 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

nav a {
  transition: all 0.2s ease;
  text-align: center;
}
nav a:hover {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

#navbar-mobile {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>