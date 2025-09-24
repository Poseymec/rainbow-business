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
            to="/admin"
            class="flex items-center p-3 rounded-lg hover:bg-red-700 transition-colors group"
            :class="$route.path === '/' ? 'bg-red-700' : ''"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            <span>Tableau de bord</span>
          </NuxtLink>
        </li>

        <hr class="border-red-800 my-2" />

        <!-- Catégories -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('categorys')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Catégories</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.categorys }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.categorys" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/category/"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/category/' ? 'bg-red-600' : ''"
              >
                📋 Liste 
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/category/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/category/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter
              </NuxtLink>
            </li>
          </ul>
        </li>

        <hr class="border-red-800 my-2" />

        <!-- products -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('products')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>produits</span>
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
                to="/admin/product/"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/product/' ? 'bg-red-600' : ''"
              >
                📋 Liste 
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/product/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/product/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter 
              </NuxtLink>
            </li>
          </ul>
        </li>

        <hr class="border-red-800 my-2" />

        <!-- Sliders -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('sliders')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Sliders</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.sliders }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.sliders" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/slider/"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/slider/' ? 'bg-red-600' : ''"
              >
                📋 Liste 
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/slider/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/sliders/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter 
              </NuxtLink>
            </li>
          </ul>
        </li>

        <hr class="border-red-800 my-2" />

        <!-- Contenu du site -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('siteElements')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Contenu du site</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.siteElements }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.siteElements" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/site-element"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/site-element/' ? 'bg-red-600' : ''"
              >
                📋 Liste 
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/site-element/create"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/site-element/create' ? 'bg-red-600' : ''"
              >
                ➕ Ajouter un contenu
              </NuxtLink>
            </li>
          </ul>
        </li>

        <hr class="border-red-800 my-2" />

        <!-- Contact & Newsletter -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('contact')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Contact & Newsletter</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.contact }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.contact" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/other/contact-list"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
              >
                📋 Messages de contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/other/NewsLetter"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
              >
                📋 Abonnés à la newsletter
              </NuxtLink>
            </li>
          </ul>
        </li>

        <hr class="border-red-800 my-2" />

        

        <!-- Clients -->
       <!-- <li>
          <NuxtLink
            to="/admin/user"
            class="flex items-center p-3 rounded-lg hover:bg-red-700 transition-colors group"
            :class="$route.path === '/admin/clients' ? 'bg-red-700' : ''"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Clients</span>
          </NuxtLink>
        </li>--

        <hr class="border-red-800 my-2" />-->

        <!-- Utilisateurs (nouveau dossier en bas) -->
        <li>
          <button
            type="button"
            class="flex items-center w-full p-3 text-left rounded-lg hover:bg-red-700 transition-colors group"
            @click="toggleSection('users')"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Utilisateurs</span>
            <svg
              class="w-4 h-4 ml-auto transition-transform"
              :class="{ 'rotate-180': openSections.users }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="openSections.users" class="pl-6 mt-1 space-y-1">
            <li>
              <NuxtLink
                to="/admin/user/"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/user/' ? 'bg-red-600' : ''"
              >
                👥 utilisateurs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/admin/user/roles"
                class="block p-2 rounded hover:bg-red-600 transition-colors"
                :class="$route.path === '/admin/user/roles' ? 'bg-red-600' : ''"
              >
                🔐 Gestion des rôles
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const openSections = reactive({
  categories: false,
  products: false,
  sliders: false,
  siteElements: false,
  contact: false,
  users: false
})

const toggleSection = (section) => {
  openSections[section] = !openSections[section]
}
</script>