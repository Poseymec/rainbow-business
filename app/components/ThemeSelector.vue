<script setup>
import { ref, onMounted } from "vue";

// Valeur par défaut : 'dark'
const theme = ref("dark");

const applyTheme = (value) => {
  if (value === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
  localStorage.setItem("theme", value);
};

onMounted(() => {
  // Récupère le thème sauvegardé, sinon utilise 'dark' par défaut
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.value = savedTheme;
  } else {
    // Assure-toi que le thème par défaut est appliqué au premier chargement
    theme.value = "dark";
  }
  applyTheme(theme.value);
});

const setTheme = (value) => {
  theme.value = value;
  applyTheme(value);
};

const toggleTheme = () => {
  const newTheme = theme.value === "light" ? "dark" : "light";
  setTheme(newTheme);
};
</script>

<template>
  <div class="flex items-center">
    <button
      @click="toggleTheme"
      class="relative inline-flex h-6 w-12 items-center rounded-full p-1 transition-colors focus:outline-none"
      :class="{
        'bg-red-100': theme === 'light',
        'bg-red-600': theme === 'dark'
      }"
      aria-label="Toggle dark mode"
    >
      <span
        class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform flex items-center justify-center text-xs"
        :class="{
          'translate-x-6': theme === 'dark',
          'translate-x-0.5': theme === 'light'
        }"
      >
        <span v-if="theme === 'light'">☀️</span>
        <span v-else>🌙</span>
      </span>
    </button>
  </div>
</template>