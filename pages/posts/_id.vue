<template>
  <section class="relative flex flex-col">
    <datocms-image class="rounded-lg" :data="post.coverImage.responsiveImage" />

    <h3 class="absolute top-0 left-0 p-4 opacity-75">
      {{ $helpers.formatDate($i18n.locale, post.publicationDate) }}
    </h3>

    <h1 class="py-4">
      {{ post.title }}
    </h1>

    <div v-html="post.content" />
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

    store.commit('i18n/setRouteParams', {
      en: { id: data.post._allSlugLocales[0].value },
      fr: { id: data.post._allSlugLocales[1].value },
    })

    return { ready: !!data, ...data }
  },

  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.post.seo, this.site.favicon)
  },
}
</script>
