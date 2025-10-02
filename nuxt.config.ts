// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from 'vite-tsconfig-paths';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   routeRules: {
    '/admin/**': { ssr: false }
   },
  modules: [
   
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
  
  /*i18n: {
  defaultLocale: 'fr',
  langDir: 'locales/',
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'fr', name: 'Français', file: 'fr.json' }
  ]
  }*/

   i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],
    langDir: 'locales', // 👈 ton dossier /locales
    vueI18n: './i18n.config.ts' // 👈 fichier de config vue-i18n
  }

, 
  app: {
    baseURL: '/app/',
    head: {
      title: 'Rainbow-busness',
    
    }
  }
})