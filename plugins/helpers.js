import Vue from 'vue'

const helpers = {
  formatDate(locale, date) {
    return new Date(date)
      .toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      .split('&nbsp;')
      .join('')
      .toLocaleLowerCase()
  },
  getPostUrl(locale, post) {
    return `${locale === 'fr' ? '/fr' : ''}/posts/${post.slug}`
  },
}

const plugin = {
  install(Vue) {
    Vue.prototype.$helpers = helpers
  },
}

Vue.use(plugin)
