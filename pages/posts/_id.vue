<template>
  <section class="flex flex-col">
    <datocms-image class="rounded-lg" :data="post.coverImage.responsiveImage" />

    <section>
      <h3>
        {{ formatDate(post.publicationDate) }}
      </h3>
      <h1>
        <nuxt-link :to="`/posts/${post.slug}`">
          {{ post.title }}
        </nuxt-link>
      </h1>

      <div v-html="post.content" />
    </section>
  </section>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  async asyncData({ app, params, store }) {
    const locale = app.i18n.locale

    const data = await request({
      query: gql`
        query BlogPostQuery($locale: SiteLocale!, $slug: String!) {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          post(locale: $locale, filter: { slug: { eq: $slug } }) {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            id
            title
            slug
            _allSlugLocales {
              locale
              value
            }
            publicationDate: _firstPublishedAt
            content
            coverImage {
              responsiveImage(imgixParams: { fit: crop, w: 1200, h: 380 }) {
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
      variables: {
        locale,
        slug: params.id,
      },
    })

    console.log(store.state)

    store.commit('i18n/setRouteParams', {
      en: { id: data.post._allSlugLocales[0].value },
      fr: { id: data.post._allSlugLocales[1].value },
    })

    return { ready: !!data, ...data }
  },

  methods: {
    formatDate(date) {
      return new Date(date)
        .toLocaleDateString(this.$i18n.locale === 'fr' ? 'fr-FR' : 'en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .split('&nbsp;')
        .join('')
    },
  },

  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.post.seo, this.site.favicon)
  },
}
</script>
