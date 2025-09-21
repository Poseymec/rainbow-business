/*export const useTheme = () => {
  const theme = ref('light')
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    
    if (process.client) {
      if (newTheme === 'dark') {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        document.documentElement.style.colorScheme = 'dark'
      } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
        document.documentElement.style.colorScheme = 'light'
      }
    }
  }
  
  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }
  
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        theme.value = savedTheme
      } else {
        theme.value = 'light' // Par défaut : clair
      }
    }
  }
  
  return {
    theme: readonly(theme),
    setTheme,
    toggleTheme,
    initTheme
  }
}*/

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
/*document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);
// Whenever the user explicitly chooses light mode
localStorage.theme = "light";
// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";
// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");*/