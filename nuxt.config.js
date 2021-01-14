// Imports
require('dotenv').config()
import { gql, request } from './lib/datocms'

// Variables
const locales = [
  {
    code: 'en',
    icon: '🇺🇸',
    name: 'English',
  },
  {
    code: 'fr',
    icon: '🇫🇷',
    name: 'Français',
  },
]

// Config
export default {
  /**
   * Generate routes at build time
   */
  generate: {
    async routes() {
      const routes = []
      const localeCodes = locales.map((locale) => locale.code)

      const data = await request({
        query: gql`
          {
            posts: allPosts(orderBy: _firstPublishedAt_DESC) {
              _allSlugLocales {
                locale
                value
              }
            }
          }
        `,
      })

      data.posts.forEach((post) => {
        localeCodes.forEach((code) => {
          const codeSlug = post._allSlugLocales.find(
            (slug) => slug.locale === code
          ).value

          routes.push(`${code === 'fr' ? '/fr/' : '/'}posts/${codeSlug}`)
        })
      })

      return routes
    },
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.SITE_TITLE || 'Yaël',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@700&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#7f9cf5' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/datocms-image',
    '~/plugins/lottie',
    '~/plugins/motion',
    '~/plugins/globals',
    '~/plugins/helpers',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/tailwindcss-module
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/teamnovu/nuxt-breaky
    [
      '@teamnovu/nuxt-breaky',
      {
        enabled: true,
        enableInProd: false,
        colorScheme: 'auto',
        position: 'bottomRight',
      },
    ],
    // Doc: https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics',
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
    // Doc: https://typescript.nuxtjs.org/
    '@nuxt/typescript-build'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://aceforth.com/docs/nuxt-netlify
    '@aceforth/nuxt-netlify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // Doc: https://github.com/nuxt-community/nuxt-i18n
    [
      'nuxt-i18n',
      {
        vuex: true,
        locales,
        defaultLocale: 'en',
      },
    ],
    // Doc: https://content.nuxtjs.org
    '@nuxt/content'
  ],
  /**
   * Tailwind
   */
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: true,
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
  googleAnalytics: {
    id: process.env.NUXT_ENV_GA_ID,
  },
}
