<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Mock de produits
const products = [
  {
    id: 1,
    name: 'papier aluminium',
    category: 'papier',
    price: 1500,
    image: '/images/image3.jpg',
    rating: 4.8,
    reviews: 124,
    description: [
      'Qualité alimentaire premium.',
      'Idéal pour la cuisson, la conservation et l’emballage.',
      'Résistant à la chaleur et au froid.'
    ]
  },
  {
    id: 2,
    name: 'papier aluminium',
    category: 'papier',
    price: 3000,
    image: '/images/image2.jpg',
    rating: 4.5,
    reviews: 89,
    description: ['Lot de 3 rouleaux.', 'Épaisseur renforcée.']
  },
  {
    id: 3,
    name: 'papier aluminium',
    category: 'papier',
    price: 1000,
    image: '/images/image3.jpg',
    rating: 4.9,
    reviews: 302,
    description: ['Format économique.', 'Facile à déchirer.']
  },
  {
    id: 4,
    name: 'Papier aluminium',
    category: 'papier',
    price: 500,
    image: '/images/image4.jpg',
    rating: 4.7,
    reviews: 256,
    description: ['Petit format.', 'Idéal pour pique-niques.']
  },
  {
    id: 5,
    name: 'papier aluminium',
    category: 'papier',
    price: 500,
    image: '/images/image1.jpg',
    rating: 4.3,
    reviews: 45,
    description: ['Pack de démarrage.']
  },
  {
    id: 6,
    name: 'papier aluminium',
    category: 'papier',
    price: 1500,
    image: '/images/image4.jpg',
    rating: 4.6,
    reviews: 178,
    description: ['Rouleau géant.', 'Livraison gratuite.']
  }
]

const route = useRoute()
const productId = computed(() => parseInt(route.params.id))

const product = computed(() => {
  return products.find(p => p.id === productId.value)
})

if (!product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Produit non trouvé'
  })
}

const isFavorite = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  console.log(isFavorite.value ? 'Ajouté aux favoris' : 'Retiré des favoris')
}

const addToCart = () => {
  alert(`"${product.value.name}" ajouté au panier !`)
}
</script>

<template>
  <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <!-- 🔙 Bouton retour -->
      <div class="mb-6">
        <NuxtLink
          to="/product"
          class="inline-flex items-center gap-2 text-[#E8192C] hover:text-red-700 font-medium transition-colors group"
        >
          <svg
            class="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Retour aux produits
        </NuxtLink>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <!-- Image -->
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full rounded-lg shadow-md"
          />
        </div>

        <!-- Détails -->
        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            {{ product.name }}
          </h1>

          <!-- Prix & Étoiles -->
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
            </p>

            <div class="flex items-center gap-2 mt-2 sm:mt-0">
              <div class="flex items-center gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                ({{ product.rating }})
              </p>
              <span class="text-sm font-medium text-gray-900 dark:text-white">
                {{ product.reviews }} avis
              </span>
            </div>
          </div>

          <!-- Boutons -->
          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <button
              @click="toggleFavorite"
              :class="[
                'flex items-center justify-center py-2.5 px-5 text-sm font-medium rounded-lg border focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700',
                isFavorite
                  ? 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700'
                  : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-red-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              ]"
            >
              <svg
                class="w-5 h-5 -ms-2 me-2"
                fill="none"
                viewBox="0 0 24 24"
                :stroke="isFavorite ? '#ef4444' : 'currentColor'"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              {{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
            </button>

            <button
              @click="addToCart"
              class="text-white mt-4 sm:mt-0 bg-[#E8192C] hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#E8192C] dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-800 flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 -ms-2 me-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>
              Ajouter au panier
            </button>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <!-- Description -->
          <div class="space-y-3">
            <p
              v-for="(line, index) in product.description"
              :key="index"
              class="text-gray-500 dark:text-gray-400"
            >
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>