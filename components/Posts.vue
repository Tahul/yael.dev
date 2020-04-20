<template>
  <section>
    <div
      v-for="post in posts.slice(0, 2)"
      v-bind:key="post.slug"
      class="relative flex items-center w-full mt-16"
    >
      <div class="absolute w-1 h-16 border-2 border-indigo-400 line" />

      <div class="book">
        <lottie path="./animations/book.json" />
      </div>

      <datocms-image class="image" :data="post.coverImage.responsiveImage" />

      <div class="ml-4 truncate md:ml-8">
        <h2 :title="post.title" class="truncate">{{ post.title }}</h2>

        <p class="text-sm italic text-gray-400 md:text-lg">
          {{ dateFormat(post) }}
        </p>
      </div>
    </div>
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

  computed: {
    dateFormat() {
      return (post) =>
        new Date(post.publicationDate)
          .toLocaleDateString('en-GB', {
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

<style scoped>
.line {
  top: -4rem;
  left: 2rem;

  @screen md {
    left: 4rem;
  }

  transform: translate(-50%);
  border-style: dashed;
}

.book {
  @apply absolute w-16 h-16 flex items-center justify-center z-50;

  &:hover {
    @apply bg-red-400;
  }

  left: 4rem;
  transform: translate(-50%);
}
</style>
