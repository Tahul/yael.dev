<template>
  <home-section :responsive-image="home.profilePicture.responsiveImage">
    <template v-slot:hoverContent>
      <span class="text-4xl wave">
        👋
      </span>
    </template>

    <div v-html="marked(home.welcome)" />

    <stats class="mt-4" />
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

  data: () => ({
    hovered: false,
  }),

  computed: {
    values() {
      if (this.hovered) {
        return {
          offset: 0,
          opacity: 1,
        }
      }

      return {
        offset: -100,
        opacity: 0,
      }
    },

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
.book {
  @apply absolute w-16 h-16 p-4 flex items-center justify-center z-50 border-indigo-400 border-4 rounded-full overflow-hidden;
  background-color: rgba(0, 0, 0, 0.15);
  left: 2rem;
  transform: translate(-50%);

  @screen md {
    @apply w-32 h-32 p-8;
    left: 4rem;
  }
}

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
