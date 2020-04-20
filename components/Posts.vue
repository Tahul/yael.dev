<template>
  <section>
    <transition-group name="fade">
      <post
        v-for="(post, index) in posts"
        :key="post.slug"
        :index="index"
        :post="post"
      />
    </transition-group>
  </section>
</template>

<script>
import Post from './Post'

export default {
  name: 'Posts',

  components: {
    Post,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.2s;
}
</style>
