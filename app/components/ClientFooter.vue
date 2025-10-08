<template>
  <footer class="bg-gray-900 text-white pt-12 pb-8 px-4 md:px-8 border-t border-gray-800">
    <div class="max-w-7xl mx-auto">
      <!-- Grille de colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <!-- Colonne 1 : Logo + Description -->
        <div>
          <NuxtLink to="/" class="flex items-center space-x-2 mb-4">
            <img
              src="/images/logo.png"
              class="h-15"
              alt="Rainbow Business Logo"
            />
            <span class="text-xl font-bold">Rainbow Business</span>
          </NuxtLink>
          <p class="text-gray-400 leading-relaxed max-w-xs">
           Découvrez nos produits variés et restez connectés pour nos nouveautés."
          </p>
        </div>

        <!-- Colonne 2 : Liens rapides -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens Rapides</h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-gray-400 hover:text-white transition-colors duration-200 block"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Colonne 3 : Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <address class="not-italic text-gray-400 space-y-2">
            <p>Douala, Cameroun</p>
            <p>Pharmacie Axial montée Diedo-Douala</p>
            <p>📧 rainbow.bc.ltd@gmail.com</p>
            <p>📞 697065493</p>
          </address>
        </div>

        <!-- Colonne 4 : Réseaux sociaux -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Suivez-nous</h3>
          <div class="flex space-x-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              class="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Ligne de séparation -->
      <div class="border-t border-gray-800 pt-8 mt-8">
        <div class="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {{ currentYear }} RAINBOW-BUSINESS & CONSULTING . Tous droits réservés. by DIGITALPRINT service</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <NuxtLink to="/privacy" class="hover:text-white transition-colors">Politique de confidentialité</NuxtLink>
            <NuxtLink to="/terms" class="hover:text-white transition-colors">Conditions d'utilisation</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Icônes des réseaux sociaux (tu peux les remplacer par les tiennes)
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin
} from '@tabler/icons-vue'

const currentYear = ref(new Date().getFullYear())

const quickLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'À propos' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/product', label: 'Produits' }
]

const socials = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/19mhxJokTf/',
    icon: IconBrandFacebook
  },
  /*{
    name: 'Twitter',
    url: '#',
    icon: IconBrandTwitter
  },*/
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/rainbow.bc.ltd?igsh=NWoxbG51dncza3Rj',
    icon: IconBrandInstagram
  },
 /* {
    name: 'LinkedIn',
    url: '#',
    icon: IconBrandLinkedin
  }*/
]

// Si tu n'utilises pas @tabler/icons-vue, remplace par des SVG inline ou utilise un CDN
</script>

<style scoped>
footer a {
  transition: all 0.2s ease;
}
footer a:hover {
  color: #f87171; /* rouge doux au hover */
}
</style>