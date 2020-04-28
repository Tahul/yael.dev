<template>
  <home-section :responsive-image="home.profilePicture.responsiveImage">
    <template v-slot:hoverContent>
      <span class="text-2xl md:text-4xl wave">
        👋
      </span>
    </template>

    <div v-html="marked(home.welcome)" />

    <client-only>
      <stats class="mt-4" />

      <template v-slot:placeholder>
        <p class="mt-4">Loading...</p>
      </template>
    </client-only>
  </home-section>
</template>

<script>
import marked from 'marked'
import Stats from './Stats'

export default {
  name: 'Home',

  components: {
    Stats,
  },

  props: {
    home: {
      type: Object,
      required: true,
    },
  },

  computed: {
    marked() {
      return marked
    },
  },

  methods: {
    handleMouseOver() {
      this.hovered = true
    },
    handleMouseOut() {
      this.hovered = false
    },
  },
}
</script>

<style scoped>
.wave {
  display: inline-block;
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-10deg);
  }
  20% {
    transform: rotate(12deg);
  }
  30% {
    transform: rotate(-10deg);
  }
  40% {
    transform: rotate(9deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
