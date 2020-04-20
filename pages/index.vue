<template>
  <div class="my-8 md:my-16">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}
    </nuxt-link>

    <home :home="home" />

    <posts :posts="posts" />
  </div>
</template>

<script>
// Packages
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
// Components
import Home from '../components/Home'
import Posts from '../components/Posts'

export default {
  components: {
    Home,
    Posts,
  },

  async asyncData({ app, params }) {
    const locale = app.i18n.locale

    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          home: home {
            profilePicture {
              url
            }
            welcome(locale: ${locale})
          }

          posts: allPosts(first: 10, orderBy: _firstPublishedAt_DESC, locale: ${locale}) {
            id
            title
            slug
            publicationDate: _firstPublishedAt
            excerpt
            coverImage {
              responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 860 }) {
                ...imageFields
              }
            }
            author {
              name
              picture {
                responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
                  ...imageFields
                }
              }
            }
          }
        }

        ${imageFields}
        ${seoMetaTagsFields}
      `,
    })

    return { ready: !!data, ...data }
  },

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },

  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.site.favicon)
  },
}
</script>
