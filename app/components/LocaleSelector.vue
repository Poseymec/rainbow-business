<template>
  <div class="flex items-center">
    <button
      @click="toggleLocale"
      class="relative inline-flex h-6 w-12 items-center rounded-full p-1 transition-colors focus:outline-none"
      :class="{
        'bg-red-100': currentLocale === 'fr',
        'bg-red-600': currentLocale === 'en',
      }"
      aria-label="Toggle language"
    >
      <span
        class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform flex items-center justify-center text-xs"
        :class="{
          'translate-x-6': currentLocale === 'en',
          'translate-x-0.5': currentLocale === 'fr',
        }"
      >
        <span v-if="currentLocale === 'fr'">🇫🇷</span>
        <span v-else>🇬🇧</span>
      </span>
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale: currentLocale, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const toggleLocale = () => {
  const newLocale = currentLocale.value === 'fr' ? 'en' : 'fr';
  setLocale(newLocale);
  // Redirige vers la nouvelle langue
  navigateTo(switchLocalePath(newLocale));
};
</script>
