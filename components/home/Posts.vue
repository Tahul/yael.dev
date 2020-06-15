<template>
  <section>
    <nuxt-link
      v-for="(post, index) in posts"
      :key="post.slug"
      :to="$helpers.getPostUrl($i18n.locale, post)"
    >
      <home-section
        :index="index + 1"
        :responsive-image="post.coverImage.responsiveImage"
      >
        <template v-slot:hoverContent>
        </template>

        <h2 :title="post.title" class="truncate">{{ post.title }}</h2>

        <span class="mt-2 text-sm italic text-gray-400 md:text-base">
          {{ post.excerpt }}
        </span>

        <p class="text-sm italic text-gray-600 md:text-lg">
          {{ $helpers.formatDate($i18n.locale, post.publicationDate) }}
        </p>
      </home-section>
    </nuxt-link>
  </section>
</template>

<script>
import Date from '../../assets/img/date.svg?inline'

export default {
  name: 'Posts',

  components: {
    Date,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>
