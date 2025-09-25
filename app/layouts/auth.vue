<template>
  <div
    class="min-h-screen flex flex-col bg-cover bg-center background-repeat: no-repeat"
    style="background-image: url('/images/background-image.jpg')"
  >
    <!-- Contenu principal centré -->
    <main class="flex-grow flex items-center justify-center p-4">
      <slot />
    </main>

    <!-- Footer léger (optionnel) -->
    <footer class="py-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-white">
      © {{ new Date().getFullYear() }} Rainbow Business. Tous droits réservés.
    </footer>
  </div>
</template>

<script setup>
// Ce layout ne nécessite aucune logique — il sert juste de cadre
</script>