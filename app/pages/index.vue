<template>
  <!-- Contenu principal -->
  <main class="pt-15 pb-20 px-4 md:px-8">
    <!-- Section Héro — TOUT est dans un seul conteneur avec fond transparent -->
    <section class="max-w-4xl mx-auto text-center mb-24">
      <!-- 🔷 Conteneur unique pour logo + titre + description -->
      <div class="bg-transparent backdrop-blur-sm rounded-2xl px-6 py-12">
        <!-- Logo -->
        <div class="mb-8">
          <img
            src="/images/logo.png"
            alt="Logo Rainbow Business"
            class="mx-auto h-40 md:h-40 lg:h-60"
          />
        </div>

        <!-- Titre -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-6">
          Bienvenue chez Rainbow Business
        </h1>

        <!-- Description -->
        <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          Rainbow Business vous présente une sélection de produits variés, alliant qualité et style. Découvrez facilement ce dont vous avez besoin grâce à notre site clair et moderne
        </p>

        <!-- Bouton -->
        <NuxtLink
          to="/contact"
          class="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          Voir nos produits
        </NuxtLink>
      </div>
    </section>

    <!-- Carousel en bas -->
    <section class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Découvrez nos réalisations
      </h2>
      <div class="relative overflow-hidden rounded-2xl shadow-2xl">
        <!-- Slides -->
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex-shrink-0"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>

        <!-- Indicateurs (dots) -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <button
            v-for="(image, index) in images"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="[
              currentIndex === index
                ? 'bg-white'
                : 'bg-white/50 hover:bg-white/80'
            ]"
            :aria-label="`Aller à la slide ${index + 1}`"
          ></button>
        </div>

        <!-- Flèches de navigation -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide précédente"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide suivante"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  </main>
  <!-- Section Contact + Newsletter -->
  <contact />

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import contact from './clients/contact.vue'

// Images du carousel (remplace par tes propres URLs)
const images = ref([
  {
    src: '/images/image1.jpg',
    alt: 'produit 1'
  },
  {
    src: '/images/image2.jpg',
    alt: 'produit 2'
  },
  {
    src: '/images/image3.jpg',
    alt: 'produit 3'
  }
])

const currentIndex = ref(0)

// Navigation
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? images.value.length - 1
      : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

// Changement automatique (optionnel)
onMounted(() => {
  const interval = setInterval(() => {
    nextSlide()
  }, 5000) // Change toutes les 5 secondes

  // Nettoyage à la destruction du composant
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
/* Effet de survol doux sur les flèches */
button:hover {
  transform: scale(1.05);
}

/* Animation fluide pour le carousel */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>