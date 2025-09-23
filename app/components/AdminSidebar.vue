<!-- app/components/admin/AdminSidebar.vue -->
<template>
  <aside
    :class="{
      'translate-x-0': isOpen,
      '-translate-x-full': !isOpen
    }"
    class="w-64 bg-[#E8192C] text-white transition-transform duration-300 ease-in-out md:translate-x-0 fixed top-16 left-0 bottom-0 z-40 overflow-y-auto"
    aria-label="Sidebar"
  >
    <div class="px-3 py-5">
      <ul class="space-y-2">
        <!-- Dashboard -->
        <li>
          <NuxtLink
            to="/admin/admin"
            class="flex items-center p-3 rounded-lg hover:bg-red-700 transition-colors group"
            :class="$route.path === '/admin' ? 'bg-red-700' : ''"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span>Tableau de bord</span>
          </NuxtLink>
        </li>

        <!-- Produits (dossier déroulant) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('products')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Produits</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.products }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.products" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/produit/ProduitList"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/produit' ? 'bg-red-600' : ''"
              >
                📋 Liste des produits
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/produit/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/products/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter un produit
              </NuxtLink>
            </li>
          </ul>
        </li>

        <!-- Catégories (dossier déroulant) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('categories')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Catégories</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.categories }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.categories" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/categorie/CategorieList"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories' ? 'bg-red-600' : ''"
              >
                📋 Liste des catégories
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/categories/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter une catégorie
              </NuxtLink>
            </li>
          </ul>
        </li>
         <!-- slider (dossier déroulant) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('categories')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Slider</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.categories }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.categories" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/slider/SliderList"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories' ? 'bg-red-600' : ''"
              >
                📋 Liste des Slider
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/slider/AddSlider"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter une Slider
              </NuxtLink>
            </li>
          </ul>
        </li>
         <!-- siteelement (dossier déroulant) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('categories')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Contenu du site</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.categories }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.categories" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/siteelement/SiteElementList"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories' ? 'bg-red-600' : ''"
              >
                📋 Liste des Contenu
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/siteElement/createAddSiteElement"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter un contenu
              </NuxtLink>
            </li>
          </ul>
        </li>
         <!-- Catégories (dossier déroulant) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('categories')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Contact & Newsletter</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.categories }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.categories" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/autre/ContactList"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories' ? 'bg-red-600' : ''"
              >
                📋 Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/autre/NewsLetter"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/categories/create' ? 'bg-red-600' : ''"
              >
                📋 Newsletter
              </NuxtLink>
            </li>
          </ul>
        </li>

        <!-- Commandes -->
        <li>
          <NuxtLink
            to="/admin/orders"
            class="flex items-center p-3 rounded-lg hover:bg-red-700 transition-colors group"
            :class="$route.path === '/admin/orders' ? 'bg-red-700' : ''"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Commandes</span>
          </NuxtLink>
        </li>

        <!-- Clients -->
        <li>
          <NuxtLink
            to="/admin/clients"
            class="flex items-center p-3 rounded-lg hover:bg-red-700 transition-colors group"
            :class="$route.path === '/admin/clients' ? 'bg-red-700' : ''"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Clients</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const openSections = reactive({
  produits: false,
  categories: false,
  
})

const toggleSection = (section) => {
  openSections[section] = !openSections[section]
}
</script>