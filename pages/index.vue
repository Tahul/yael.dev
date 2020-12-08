<template>
  <div class="md:my-16">
    <home :home="home" />

    <posts :posts="posts" />
  </div>
</template>

<script>
// Packages
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
// Components
import Home from '../components/home/Home'
import Posts from '../components/home/Posts'

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
              responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 860 }) {
                ...imageFields
              }
            }

            welcome(locale: ${locale})

            seo: _seoMetaTags {
              attributes
              content
              tag
            }
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

  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.site.favicon, this.home.seo)
  },
}
</script>
