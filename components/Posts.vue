<template>
  <section>
    <div
      v-for="post in posts.slice(0, 2)"
      v-bind:key="post.slug"
      class="flex items-center"
    >
      <div class="flex items-center h-32 w-32 rounded-full overflow-hidden">
        <datocms-image :data="post.coverImage.responsiveImage" />
      </div>

      {{ post.title }}
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
}
</script>

<style lang="scss" scoped></style>
