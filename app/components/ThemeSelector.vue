<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

// Valeur par défaut : 'dark'
const theme = ref('dark')

const applyTheme = (value) => {
  if (value === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
  if (process.client) {
    localStorage.setItem('theme', value)
  }
}

onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    theme.value = savedTheme || 'dark'
    applyTheme(theme.value)
  }
})

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newTheme
  applyTheme(newTheme)
}
</script>

<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors outline-none focus:ring-2 focus:ring-[#E8192C]"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
  >
    <Icon
      v-if="theme === 'light'"
      icon="mdi:weather-sunny"
      width="20"
      class="text-yellow-600 dark:text-yellow-400"
    />
    <Icon
      v-else
      icon="mdi:weather-night"
      width="20"
      class="text-indigo-400 dark:text-indigo-300"
    />
  </button>
</template>