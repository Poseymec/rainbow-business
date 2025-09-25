<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-16">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {{ t('services_page.title') }}
        </h1>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Des solutions adaptées à tous vos besoins professionnels.
        </p>
      </div>

      <!-- Cartes de services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1 : Distribution -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-[#E8192C] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ t('services_page.distribution.title') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('services_page.distribution.description') }}
          </p>
        </div>

        <!-- Service 2 : Approvisionnement sur mesure -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-[#E8192C] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ t('services_page.custom_supply.title') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('services_page.custom_supply.description') }}
          </p>
        </div>

        <!-- Service 3 : Qualité garantie -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 bg-[#E8192C] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ t('services_page.quality.title') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('services_page.quality.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>