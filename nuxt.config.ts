// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s - Gold Insight',
      title: 'Gold Insight - Smart Gold Price Predictions',
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        { name: 'description', content: 'Dapatkan prediksi harga emas paling akurat dan analisis mendalam dengan Gold Insight. Pantau terus tren pasar emas hari ini.' },
        { property: 'og:title', content: 'Gold Insight - Smart Gold Price Predictions' },
        { property: 'og:description', content: 'Dapatkan prediksi harga emas paling akurat dan analisis mendalam dengan Gold Insight. Pantau terus tren pasar emas hari ini.' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:url', content: 'https://goldsight.netlify.app/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Gold Insight - Smart Gold Price Predictions' },
        { name: 'twitter:description', content: 'Dapatkan prediksi harga emas paling akurat dan analisis mendalam dengan Gold Insight.' },
        { name: 'twitter:image', content: '/logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' }
      ]
    }
  }
})
