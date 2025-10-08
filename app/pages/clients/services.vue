<template>
  <div class="min-h-screen bg-gray-200 dark:bg-gray-900 mt-10 rounded-3xl shadow-xl transition-colors duration-300 ">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-16">
        <h1 class="text-3xl font-heading sm:text-4xl md:text-5xl font-extrabold text-[#E8192C] tracking-tight">
          {{ t('services_page.title') }}
        </h1>
        <p class="mt-6 text-2xl font-sans text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {{ t('services_page.title2') }}
        </p>
      </div>

      <!-- Cartes de services -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Service 1 : Distribution -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div class="mb-4 text-[#E8192C]">
            <Icon icon="mdi:truck-delivery" width="48" />
          </div>
          <h3 class="text-2xl  font-heading font-bold text-[#E8192C] dark:text-[#E8192C] mb-2">
            {{ t('services_page.distribution.title') }}
          </h3>
          <p class="text-gray-700 font-sans text-xl dark:text-gray-300 leading-relaxed">
            {{ t('services_page.distribution.description') }}
          </p>
        </div>

        <!-- Service 2 : Approvisionnement sur mesure -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div class="mb-4 text-[#E8192C]">
            <Icon icon="mdi:clipboard-list" width="48" />
          </div>
          <h3 class="text-2xl font-heading font-bold text-[#E8192C] dark:text-[#E8192C] mb-2">
            {{ t('services_page.custom_supply.title') }}
          </h3>
          <p class="text-gray-700 font-sans text-xl dark:text-gray-300 leading-relaxed">
            {{ t('services_page.custom_supply.description') }}
          </p>
        </div>

        <!-- Service 3 : Qualité garantie -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div class="mb-4 text-[#E8192C]">
            <Icon icon="mdi:earth" width="48" />
          </div>
          <h3 class="text-2xl font-bold font-heading text-[#E8192C] dark:text-[#E8192C] mb-2">
            {{ t('services_page.quality.title') }}
          </h3>
          <p class="text-gray-700 font-sans text-xl dark:text-gray-300 leading-relaxed">
            {{ t('services_page.quality.description') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const { t } = useI18n()
</script>