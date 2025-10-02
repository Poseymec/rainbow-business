<template>
  <div class="min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors duration-300 rounded-3xl shadow-xl mt-10">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-16">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E8192C] tracking-tight">
          {{ t('about_page.title') }}
        </h1>
      </div>

      <!-- Description principale -->
      <div class="prose prose-lg dark:prose-invert max-w-3xl mx-auto mb-20 text-center">
        <p class="text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
          {{ t('about_page.description') }}
        </p>
        <p class="mt-2 text-gray-600 dark:text-gray-400 font-medium">
          {{ t('about_page.founded') }}
        </p>
      </div>

      <!-- Deux colonnes : Distribution + Approvisionnement -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <!-- Distribution & Vente -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-transform hover:scale-[1.02]"
        >
          <div class="flex items-start gap-4">
            <div class="mt-1 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Icon icon="mdi:truck-delivery" width="28" class="text-[#E8192C] dark:text-red-400" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-[#E8192C] dark:text-[#E8192C] mb-3">
                {{ t('about_page.distribution.title') }}
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('about_page.distribution.text') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Approvisionnement sur mesure -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 md:p-8 transition-transform hover:scale-[1.02]"
        >
          <div class="flex items-start gap-4">
            <div class="mt-1 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Icon icon="mdi:clipboard-list" width="28" class="text-[#E8192C] dark:text-red-400" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-[#E8192C] dark:text-[#E8192C] mb-3">
                {{ t('about_page.custom.title') }}
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ t('about_page.custom.text') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
const { t } = useI18n()
</script>