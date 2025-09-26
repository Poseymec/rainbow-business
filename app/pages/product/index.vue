<script setup>
import { ref, computed } from 'vue'

// État
const searchQuery = ref('')
const selectedCategory = ref('') // <-- Une seule catégorie sélectionnée
const minPrice = ref(0)
const maxPrice = ref(1000)
const sortBy = ref('popular')

// Données mock
const categories = [
  { id: 0, name: 'Toutes les catégories', slug: '' }, // Option "Tout"
  { id: 1, name: 'Imprimantes', slug: 'imprimantes' },
  { id: 2, name: 'Scanners', slug: 'scanners' },
  { id: 3, name: 'Consommables', slug: 'consommables' },
  { id: 4, name: 'Papier', slug: 'papier' },
  { id: 5, name: 'Logiciels', slug: 'logiciels' }
]

const products = [
  {
    id: 1,
    name: 'papier alluminium',
    category: 'papier',
    price: 1500,
    image: '/images/image3.jpg',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'papier alluminium',
    category: 'papier',
    price: 3000,
    image: '/images/image2.jpg',
    rating: 4.5,
    reviews: 89
  },
  {
    id: 3,
    name: 'papier alluminium',
    category: 'papier',
    price: 1000,
    image: '/images/image3.jpg',
    rating: 4.9,
    reviews: 302
  },
  {
    id: 4,
    name: 'Papier alluminium',
    category: 'papier',
    price: 500,
    image: '/images/image4.jpg',
    rating: 4.7,
    reviews: 256
  },
  {
    id: 5,
    name: 'papier alluminium',
    category: 'papier',
    price: 500,
    image: '/images/image1.jpg',
    rating: 4.3,
    reviews: 45
  },
  {
    id: 6,
    name: 'papier alluminium',
    category: 'papier',
    price: 1500,
    image: '/images/image4.jpg',
    rating: 4.6,
    reviews: 178
  }
]

// Calcul des produits filtrés
const filteredProducts = computed(() => {
  return products.filter(product => {
    // Recherche par nom
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Filtre par catégorie (si aucune sélectionnée, on affiche tout)
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    
    // Filtre par prix
    const matchesPrice = product.price >= minPrice.value && product.price <= maxPrice.value
    
    return matchesSearch && matchesCategory && matchesPrice
  }).sort((a, b) => {
    // Tri
    switch (sortBy.value) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviews - a.reviews
      default:
        return 0
    }
  })
})

// Réinitialiser les filtres
const resetFilters = () => {
  selectedCategory.value = ''
  minPrice.value = 0
  maxPrice.value = 1000
  searchQuery.value = ''
  sortBy.value = 'popular'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-red-500 dark:text-red-500 mb-8">
      Nos Produits
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Colonne Gauche : Filtres -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Recherche -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rechercher
          </label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            placeholder="Nom du produit..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-transparent"
          />
        </div>

        <!-- Catégories (Liste déroulante) -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie
          </label>
          <select
            id="category"
            v-model="selectedCategory"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-transparent"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Prix -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Prix (F)
          </h3>
          <div class="space-y-4">
            <div>
              <input
                v-model.number="minPrice"
                type="number"
                min="0"
                :max="maxPrice"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                placeholder="Min"
              />
            </div>
            <div>
              <input
                v-model.number="maxPrice"
                type="number"
                :min="minPrice"
                max="5000"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <!-- Bouton Réinitialiser -->
        <button
          @click="resetFilters"
          class="w-full py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>

      <!-- Colonne Droite : Produits -->
      <div class="lg:col-span-3">
        <!-- Barre de tri -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ filteredProducts.length }} produit(s) trouvé(s)
          </p>
          <div class="flex items-center gap-2">
            <label for="sort" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trier par :
            </label>
            <select
              id="sort"
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#E8192C]"
            >
              <option value="popular">Populaire</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Meilleure note</option>
              <option value="reviews">Plus d'avis</option>
            </select>
          </div>
        </div>

        <!-- Grille de produits -->
        <div
          v-if="filteredProducts.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div class="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {{ product.name }}
            </h3>
           <!-- <div class="flex items-center gap-1 mb-2">
              <div v-for="star in 5" :key="star" class="text-yellow-400">
                <svg v-if="star <= Math.floor(product.rating)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current text-gray-300 dark:text-gray-600" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                ({{ product.reviews }})
              </span>
            </div>-->
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-[#E8192C]">
                {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
              </span>
             <NuxtLink
                :to="`/product/${product.id}`"
                class="px-3 py-1 text-sm bg-[#E8192C] hover:bg-red-700 text-white rounded transition-colors"
                >
                Voir
            </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Aucun produit trouvé -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.884-6.124-2.364M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
            Aucun produit trouvé
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
          <button
            @click="resetFilters"
            class="mt-4 px-4 py-2 text-sm font-medium text-[#E8192C] hover:text-red-700 border border-[#E8192C] hover:border-red-700 rounded transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  </div>
</template>