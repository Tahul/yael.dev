export default {
  mode: 'universal',

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
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /* Layout Transitions */
  /* layoutTransition: {
    name: 'layout',
    mode: '',
  }, */
  /* Page Transitions */
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
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
  buildModules: [],
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
    // Doc: https://github.com/nuxt-community/tailwindcss-module
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/nuxt-i18n
    [
      'nuxt-i18n',
      {
        vuex: true,
        locales: [
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
        ],
        defaultLocale: 'en',
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
