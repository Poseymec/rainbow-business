/** @type {import('tailwindcss').Config} */
module.exports = {
darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],      // pour le texte
        heading: ['Poppins', 'sans-serif'] // pour les titres
      }    
      },
  },
  plugins: [],



}