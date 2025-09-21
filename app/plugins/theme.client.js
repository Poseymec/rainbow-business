/*export default defineNuxtPlugin(() => {
  // Double vérification côté client
  const { initTheme } = useTheme()
  
  // S'assurer que le thème est appliqué dès que possible
  nextTick(() => {
    initTheme()
  })
  
  // Écouter les changements de préférence système
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches)
      }
    })
  }
})*/