<template>
  <div
    class="relative flex flex-col justify-center w-full px-6 py-12 overflow-hidden bg-cover border-4 border-indigo-600 rounded-lg shadow-lg"
    :style="{ ...modalStyle }"
  >
    <!-- Overlay -->
    <div class="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-75" />

    <!-- Content -->
    <h1 class="z-10 mb-4 select-none">{{ locale.title }}</h1>

    <p class="z-10 mb-4 select-none md:text-lg">{{ locale.subtitle }}</p>

    <p class="z-10 mb-8 select-none md:text-lg">{{ locale.secondSubtitle }}</p>

    <subscribe-form class="z-10" v-model="subscribed" />

    <!-- Close button -->
    <div
      v-if="closeable"
      class="absolute top-0 right-0 z-50 block w-4 h-4 mt-1 mr-2 text-4xl transition-colors duration-100 ease-in-out cursor-pointer hover:text-indigo-400"
      @click="$emit('close')"
    >
      <svg
        class="fill-current"
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 352 512"
      >
        <path
          fill="currentColor"
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import SubscribeForm from './SubscribeForm'

export default {
  name: 'SubscribeBox',

  components: {
    SubscribeForm,
  },

  props: {
    closeable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data: () => ({
    subscribed: false,
    images: ['jared', 'theoffice'],
  }),

  watch: {
    subscribed: {
      immediate: true,
      handler(newVal) {
        this.$emit('input', newVal)
      },
    },
  },

  computed: {
    modalStyle() {
      return {
        'background-image': `url(${this.randomImage})`,
        'background-position': '50% 20%',
        'min-height': '50%',
      }
    },

    randomImage() {
      return (
        '/images/' +
        this.images[Math.floor(Math.random() * this.images.length)] +
        '.gif'
      )
    },

    locale() {
      if (this.$i18n.locale === 'fr') {
        return {
          title: 'Hey 👋',
          subtitle: "J'espère que la lecture de mon blog vous a plu.",
          secondSubtitle:
            'Inscrivez vous à ma newsletter pour être prévenus lors des prochains articles et lors de la mise en ligne de mes projets.',
        }
      } else {
        return {
          title: 'Hey 👋',
          subtitle: 'I hope you enjoyed reading my blog.',
          secondSubtitle:
            'Subscribe to my newsletter to be notified for my upcoming articles and for the release of my projects.',
        }
      }
    },
  },
}
</script>

<style scoped></style>
