<template>
  <section class="relative flex flex-col">
    <slide-in class="mb-4">
      <img
        class="object-cover w-full h-64 rounded-lg"
        :src="post.coverImage.responsiveImage.src"
      />
    </slide-in>

    <slide-in :delay="100">
      <h1>
        {{ post.title }}
      </h1>
    </slide-in>

    <slide-in :delay="200">
      <span class="text-sm italic text-gray-400 md:text-base">
        {{ post.excerpt }}
      </span>
    </slide-in>

    <slide-in :delay="300">
      <p class="mt-0 text-lg italic text-gray-600">
        {{ $helpers.formatDate($i18n.locale, post.publicationDate) }}
      </p>
    </slide-in>

    <slide-in :delay="400">
      <div class="w-full h-1 my-4 bg-indigo-400 rounded-full" />
    </slide-in>

    <slide-in :delay="500">
      <div class="content" v-html="post.content" />
    </slide-in>

    <client-only>
      <slide-in :delay="600">
        <comments />
      </slide-in>
    </client-only>
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
            excerpt
            publicationDate: _firstPublishedAt
            content
            coverImage {
              responsiveImage {
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

  data: () => ({
    mounted: false,
  }),

  computed: {
    values() {
      if (this.mounted) {
        return {
          offset: 0,
          opacity: 1,
        }
      }

      return {
        offset: 200,
        opacity: 0,
      }
    },
  },

  mounted() {
    this.mounted = true
  },
}
</script>

<style>
.content {
  & h1,
  & h2,
  & h3,
  & h4,
  & h5 {
    @apply my-4 text-indigo-400;
  }

  & p {
    &:first-child {
      margin-top: 0;
    }
  }
}
</style>
