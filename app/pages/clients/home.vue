<template>
  <main class="pt-5 pb-20 px-4 md:px-8 ">
    <!-- Section Héro -->
    <section class="max-w-4xl mx-auto text-center mb-24">
      <div class=" rounded-2xl px-6 py-12">
        <!-- Logo -->
        <div class="mb-4 floating-div">
          <img
            src="/images/logo.png"
            :alt="$t('home.logo_alt')"
            class="mx-auto h-32 md:h-40 lg:h-48"
          />
        </div>

        <!-- Titre -->
        <h1 class="text-3xl md:text-2xl lg:text-6xl font-extrabold  mb-6">
          {{ $t('home.title') }}
        </h1>

        <!-- Description -->
        <p class="text-base font-bold md:text-lg text-gray-800 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {{ $t('home.description') }}
        </p>

        <!-- Bouton CTA -->
        <NuxtLink
          to="../product"
          class="inline-block px-6 py-3 bg-gradient-to-r from-[#E8192C] to-[#E8192C] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          {{ $t('home.cta_button') }}
        </NuxtLink>
      </div>
    </section>

    <!-- Carousel -->
    <section class="max-w-6xl mx-auto mb-24">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        {{ $t('home.carousel_title') }}
      </h2>
      <div class="relative overflow-hidden rounded-2xl shadow-2xl">
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
              class="w-full h-64 md:h-64 object-cover"
            />
          </div>
        </div>

        <!-- Indicateurs -->
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
            :aria-label="`Aller à la diapositive ${index + 1}`"
          ></button>
        </div>

        <!-- Flèches -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Diapositive précédente"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Diapositive suivante"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>

    <!-- Sections dynamiques -->
    <About />
    <Services />
    <Contact />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import About from './clients/about.vue'
import Services from './clients/services.vue'
import Contact from './clients/contact.vue'

const images = ref([
  { src: '/images/image1.jpg', alt: 'Produit 1' },
  { src: '/images/image2.jpg', alt: 'Produit 2' },
  { src: '/images/image3.jpg', alt: 'Produit 3' }
])

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? images.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

onMounted(() => {
  const interval = setInterval(nextSlide, 5000)
  onUnmounted(() => clearInterval(interval))
})
</script>

<style scoped>
button:hover {
  transform: scale(1.05);
}

.floating-div {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* Déplace de 10px vers le haut au milieu de l'animation */
  }
}
</style>