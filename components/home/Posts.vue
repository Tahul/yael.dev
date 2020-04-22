<template>
  <section>
    <nuxt-link
      v-for="(post, index) in posts"
      :key="post.slug"
      :to="`${$i18n.locale === 'fr' ? 'fr' : ''}/posts/${post.slug}`"
    >
      <home-section
        :index="index + 1"
        :responsive-image="post.coverImage.responsiveImage"
      >
        <template v-slot:hoverContent>
          <lottie path="./animations/book.json" />
        </template>

        <h2 :title="post.title" class="truncate">{{ post.title }}</h2>

        <p class="text-sm italic text-gray-400 md:text-lg">
          {{ formatDate(post.publicationDate) }}
        </p>
      </home-section>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'Posts',

  props: {
    posts: {
      type: Array,
      required: true,
    },
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
}
</script>
