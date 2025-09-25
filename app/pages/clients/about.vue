<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          {{ t('about_page.title') }}
        </h1>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-300">
          {{ t('about_page.founded') }}
        </p>
      </div>

      <!-- Description principale -->
      <div class="prose prose-lg dark:prose-invert max-w-none mb-16">
        <p class="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          {{ t('about_page.description') }}
        </p>
      </div>

      <!-- Deux colonnes : Distribution + Approvisionnement -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Distribution & Vente -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ t('about_page.distribution.title') }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('about_page.distribution.text') }}
          </p>
        </div>

        <!-- Approvisionnement sur mesure -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {{ t('about_page.custom.title') }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            {{ t('about_page.custom.text') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
</script>