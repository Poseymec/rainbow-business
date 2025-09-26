<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 mt-10 text-bold">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-16">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E8192C] tracking-tight">
          {{ t('services_page.title') }}
        </h1>
        <p class="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('services_page.title2') }}
        </p>
      </div>
      
      <!-- Cartes de services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1 : Distribution -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 text-[#E8192C] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-[#E8192C] mb-2">
            {{ t('services_page.distribution.title') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('services_page.distribution.description') }}
          </p>
        </div>

        <!-- Service 2 : Approvisionnement sur mesure -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 text-[#E8192C] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2M7 21h10m-6-9v6m4-6v6m4-6v6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-[#E8192C] mb-2">
            {{ t('services_page.custom_supply.title') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('services_page.custom_supply.description') }}
          </p>
        </div>

        <!-- Service 3 : Qualité garantie -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 text-[#E8192C] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-[#E8192C] mb-2">
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