// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // ✅ Un seul bloc routeRules
  routeRules: {
    '/admin/**': { ssr: false },
    '/api/**': { cors: true }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  css: ['@/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
      viteTsconfigPaths()
    ]
  },

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
    langDir: 'locales',
    vueI18n: './i18n.config.ts'
  },

  app: {
    baseURL: '/app',
    head: {
      title: 'Rainbow-busness'
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  },

  // ✅ Proxy API pour le développement
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