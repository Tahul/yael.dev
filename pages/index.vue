<template>
  <div>
    <section>
      <div v-for="post in posts.slice(0, 2)" v-bind:key="post.slug">
        <datocms-image :data="post.coverImage.responsiveImage" />

        {{ post }}
      </div>
    </section>

    <!-- newsletter -->
    <section>
      NEWSLETTER
    </section>

    <!-- Articles -->

    <section></section>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          posts: allPosts(first: 10, orderBy: _firstPublishedAt_DESC) {
            id
            title
            slug
            publicationDate: _firstPublishedAt
            excerpt
            coverImage {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
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
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
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
