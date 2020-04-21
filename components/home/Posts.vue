<template>
  <section>
    <home-section
      v-for="(post, index) in posts"
      :key="post.slug"
      :index="index + 1"
      :responsive-image="post.coverImage.responsiveImage"
    >
      <template v-slot:hoverContent>
        <lottie path="./animations/book.json" />
      </template>

      <h2 :title="post.title" class="truncate">{{ post.title }}</h2>

      <p class="text-sm italic text-gray-400 md:text-lg">
        {{ dateFormat(post.publicationDate) }}
      </p>
    </home-section>
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
    dateFormat(date) {
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
