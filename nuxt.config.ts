// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from 'vite-tsconfig-paths';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
 

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt',

    
  ],
   
   // Configuration globale des CSS
  css: ['@/assets/css/main.css'],
  
  vite: {
    plugins: [
      tailwindcss(),
      viteTsconfigPaths()
    ],
    
  },
  
  i18n: {
  defaultLocale: 'fr',
  langDir: 'locales/',
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'fr', name: 'Français', file: 'fr.json' }
  ]
  }, 
  app: {
    baseURL: '/app/',
    head: {
      title: 'Rainbow-busness',
    
    }
  }
})