<template>


  <!-- Contenu principal -->
  <main class="pt-28 pb-20 px-4 md:px-8">
    <!-- Section Héro -->
    <section class="max-w-4xl mx-auto text-center mb-24">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-6">
        Bienvenue chez Rainbow Business
      </h1>
      <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Découvrez nos solutions innovantes, conçues pour propulser votre entreprise vers de nouveaux sommets.
      </p>
      <NuxtLink
        to="/contact"
        class="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      >
        Commencez maintenant
      </NuxtLink>
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
</template>

<script setup>
import { ref, onMounted } from 'vue'


// Images du carousel (remplace par tes propres URLs)
const images = ref([
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    alt: 'Équipe professionnelle en réunion'
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bureau moderne avec ordinateurs'
  },
  {
    src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Présentation à un client'
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