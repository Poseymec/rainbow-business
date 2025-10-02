<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// État
const searchQuery = ref('')
const selectedCategory = ref('') // slug de la catégorie
const minPrice = ref(0)
const maxPrice = ref(5000)
const sortBy = ref('popular')

// Données mock (à remplacer par un store Pinia + API plus tard)
const products = [
  {
    id: 1,
    name: 'Papier aluminium premium',
    category: 'papier',
    price: 1500,
    image: '/images/image3.jpg',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Papier aluminium économique',
    category: 'papier',
    price: 3000,
    image: '/images/image2.jpg',
    rating: 4.5,
    reviews: 89
  },
  {
    id: 3,
    name: 'Papier aluminium industriel',
    category: 'papier',
    price: 1000,
    image: '/images/image3.jpg',
    rating: 4.9,
    reviews: 302
  },
  {
    id: 4,
    name: 'Papier aluminium alimentaire',
    category: 'papier',
    price: 500,
    image: '/images/image4.jpg',
    rating: 4.7,
    reviews: 256
  },
  {
    id: 5,
    name: 'Papier aluminium recyclé',
    category: 'papier',
    price: 500,
    image: '/images/image1.jpg',
    rating: 4.3,
    reviews: 45
  },
  {
    id: 6,
    name: 'Papier aluminium extra-large',
    category: 'papier',
    price: 1500,
    image: '/images/image4.jpg',
    rating: 4.6,
    reviews: 178
  }
]

// Catégories traduites
const categories = computed(() => [
  { id: 0, name: t('products_page.categories.all'), slug: '' },
  { id: 1, name: t('products_page.categories.imprimantes'), slug: 'imprimantes' },
  { id: 2, name: t('products_page.categories.scanners'), slug: 'scanners' },
  { id: 3, name: t('products_page.categories.consommables'), slug: 'consommables' },
  { id: 4, name: t('products_page.categories.papier'), slug: 'papier' },
  { id: 5, name: t('products_page.categories.logiciels'), slug: 'logiciels' }
])

// Produits filtrés et triés
const filteredProducts = computed(() => {
  return products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
      const matchesPrice = product.price >= minPrice.value && product.price <= maxPrice.value
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
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
  searchQuery.value = ''
  selectedCategory.value = ''
  minPrice.value = 0
  maxPrice.value = 5000
  sortBy.value = 'popular'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-red-500 dark:text-red-500 mb-8">
      {{ t('products_page.title') }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Colonne Gauche : Filtres -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Recherche -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('products_page.search_label') }}
          </label>
          <input
            id="search"
            v-model="searchQuery"
            type="text"
            :placeholder="t('products_page.search_placeholder')"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#E8192C] focus:border-transparent"
          />
        </div>

        <!-- Catégories -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ t('products_page.category_label') }}
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
            {{ t('products_page.price_label') }}
          </h3>
          <div class="space-y-4">
            <input
              v-model.number="minPrice"
              type="number"
              min="0"
              :max="maxPrice"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              :placeholder="t('products_page.min_price')"
            />
            <input
              v-model.number="maxPrice"
              type="number"
              :min="minPrice"
              max="10000"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              :placeholder="t('products_page.max_price')"
            />
          </div>
        </div>

        <!-- Bouton Réinitialiser -->
        <button
          @click="resetFilters"
          class="w-full py-2 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          {{ t('products_page.reset_filters') }}
        </button>
      </div>

      <!-- Colonne Droite : Produits -->
      <div class="lg:col-span-3">
        <!-- Barre de tri -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ t('products_page.results_count', { count: filteredProducts.length }) }}
          </p>
          <div class="flex items-center gap-2">
            <label for="sort" class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ t('products_page.sort_label') }}
            </label>
            <select
              id="sort"
              v-model="sortBy"
              class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#E8192C]"
            >
              <option value="popular">{{ t('products_page.sort_options.popular') }}</option>
              <option value="price-asc">{{ t('products_page.sort_options.price_asc') }}</option>
              <option value="price-desc">{{ t('products_page.sort_options.price_desc') }}</option>
              <option value="rating">{{ t('products_page.sort_options.rating') }}</option>
              <option value="reviews">{{ t('products_page.sort_options.reviews') }}</option>
            </select>
          </div>
        </div>

        <!-- ✅ Affichage conditionnel : grille OU message d'erreur -->
        <div v-if="filteredProducts.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              class="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-md transition-shadow p-4"
            >
              <div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 overflow-hidden">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {{ product.name }}
              </h3>
              <div class="flex items-center justify-between">
                <span class="text-lg font-bold text-[#E8192C]">
                  {{ product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' }) }}
                </span>
                <NuxtLink
                  :to="`/product/${product.id}`"
                  class="px-3 py-1 text-sm bg-[#E8192C] hover:bg-red-700 text-white rounded transition-colors"
                >
                  {{ t('products_page.view_button') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ v-else juste après le v-if -->
        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.884-6.124-2.364M18 12a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
            {{ t('products_page.no_results_title') }}
          </h3>
          <p class="text-gray-500 dark:text-gray-400">
            {{ t('products_page.no_results_text') }}
          </p>
          <button
            @click="resetFilters"
            class="mt-4 px-4 py-2 text-sm font-medium text-[#E8192C] hover:text-red-700 border border-[#E8192C] hover:border-red-700 rounded transition-colors"
          >
            {{ t('products_page.reset_filters') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>