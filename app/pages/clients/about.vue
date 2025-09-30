<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 ">
    <div class="max-w-6xl mx-auto px-4 py-12 sm:py-16 md:py-24">
      <!-- Titre -->
      <div class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#E8192C] tracking-tight">
          {{ t('about_page.title') }}
        </h1>
      </div>
      
      <!-- Description principale -->
      <div class="prose prose-lg dark:prose-invert max-w-none mb-16">
        <h1 class="mt-3 mb-4 text-center text-xl text-gray-900 font-bold dark:text-gray-300">
          {{ t('about_page.founded') }}
        </h1>
        <p class="text-gray-900 dark:text-gray-300 text-xl text-bold leading-relaxed">
          {{ t('about_page.description') }}
        </p>
      </div>

      <!-- Deux colonnes : Distribution + Approvisionnement -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- Distribution & Vente -->
        <div class=" dark:bg-gray-800 bg-[#E8192C] dark:text-white text-[#E8192C] p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-500">
          <h2 class="text-xl font-bold dark:text-[#E8192C] text-white mb-3">
            {{ t('about_page.distribution.title') }}
          </h2>
          <p class="text-gray-900 dark:text-white text-lg text-bold">
            {{ t('about_page.distribution.text') }}
          </p>
        </div>

        <!-- Approvisionnement sur mesure -->
        <div class=" bg-[#E8192C] dark:bg-gray-800 dark:text-white text-[#E8192C] p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-500">
          <h2 class="text-xl font-bold  dark:text-[#E8192C] text-white mb-3">
            {{ t('about_page.custom.title') }}
          </h2>
          <p class="text-gray-900 dark:text-white text-lg text-bold">
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