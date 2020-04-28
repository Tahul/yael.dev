<template>
  <section class="relative flex flex-col my-8">
    <slide-in>
      <datocms-image
        class="rounded-lg"
        :data="post.coverImage.responsiveImage"
      />
    </slide-in>

    <slide-in class="absolute top-0 left-0" :delay="100">
      <h3 class="p-4 opacity-75">
        {{ $helpers.formatDate($i18n.locale, post.publicationDate) }}
      </h3>
    </slide-in>

    <slide-in :delay="200">
      <h1 class="py-4">
        {{ post.title }}
      </h1>
    </slide-in>

    <slide-in :delay="300">
      <div v-html="post.content" />

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem quidem
        aperiam voluptate optio ad enim quasi earum voluptates expedita
        repudiandae. Reprehenderit adipisci, nulla animi iste quibusdam nihil
        dicta quisquam voluptatibus.
      </p>
    </slide-in>
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
