// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ✅ Règles de routes (CORS & SSR)
  routeRules: {
    '/admin/**': { ssr: false },
    '/api/**': { cors: true }
  },

  // ✅ Modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  
  // ✅ Styles globaux
  css: ['@/assets/css/main.css'],

  // ✅ Vite plugins
  vite: {
    plugins: [
      tailwindcss(),
      viteTsconfigPaths()
    ]
  },

  // ✅ i18n multilingue avec préfixe obligatoire
  i18n: {
   strategy: 'prefix',  // ✅ Toutes les langues ont un préfixe (/fr, /en, etc.)
    defaultLocale: 'fr',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root',
      fallbackLocale: 'fr'
    },

    locales: [
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', name: 'Français' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' }
    ],

    langDir: 'locales',
    vueI18n: './i18n.config.ts',

    // ✅ Corrigé pour la racine du domaine
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  },

  // ✅ Paramètres globaux
  app: {
    baseURL: '/', // ✅ Plus de /app, on est à la racine
    head: {
      title: 'Rainbow Business',
      meta: [
        { name: 'description', content: 'Plateforme  de presentation des produits variés ' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@500;700&display=swap'
        }
      ]
    }
  },

  // ✅ Variables publiques
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  },

  // ✅ Proxy pour l’API Laravel
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        prependPath: true
      }
    }
  }
})
