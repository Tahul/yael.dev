<template>
  <Motion tag="div" spring="noWobble" :values="values" class="">
    <div
      class="relative flex items-center w-full mt-8 cursor-pointer md:mt-16"
      slot-scope="_props"
      :style="{
        transform: `translateY(${_props.offset}px)`,
        opacity: `${_props.opacity}`,
      }"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
    >
      <Motion tag="div" spring="noWobble" :values="hoverValues" class="book">
        <lottie
          slot-scope="_props"
          :style="{
            transform: `translateY(${_props.offset}px)`,
            opacity: `${_props.opacity}`,
          }"
          path="./animations/book.json"
        />
      </Motion>

      <datocms-image class="image" :data="post.coverImage.responsiveImage" />

      <div class="ml-4 truncate md:ml-8">
        <h2 :title="post.title" class="truncate">{{ post.title }}</h2>

        <p class="text-sm italic text-gray-400 md:text-lg">
          {{ dateFormat }}
        </p>
      </div>
    </div>
  </Motion>
</template>

<script>
export default {
  name: 'Post',

  props: {
    post: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    hovered: false,
    mounted: false,
  }),

  computed: {
    dateFormat() {
      return new Date(this.post.publicationDate)
        .toLocaleDateString(this.$i18n.locale === 'fr' ? 'fr-FR' : 'en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .split('&nbsp;')
        .join('')
    },

    hoverValues() {
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

    values() {
      if (this.mounted) {
        return {
          offset: 0,
          opacity: 1,
        }
      }

      return {
        offset: 100,
        opacity: 0,
      }
    },
  },

  mounted() {
    setTimeout(() => {
      this.mounted = true
    }, this.index * 100)
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
  @apply absolute w-16 h-16 p-4 flex items-center justify-center z-50 border-indigo-400 border-4 rounded-full overflow-hidden;
  background-color: rgba(0, 0, 0, 0.15);
  left: 2rem;
  transform: translate(-50%);

  @screen md {
    @apply w-32 h-32 p-8;
    left: 4rem;
  }
}
</style>
