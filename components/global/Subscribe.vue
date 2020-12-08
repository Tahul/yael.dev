<template>
  <Motion tag="div" spring="noWobble" :values="values">
    <div
      class="fixed bottom-0 left-0 flex items-stretch justify-center w-full px-4 py-4 md:px-16 lg:px-32 xl:px-64"
      slot-scope="_props"
      :style="{
        transform: `translateY(${_props.offset}px)`,
        opacity: `${_props.opacity}`,
      }"
    >
      <div
        class="relative flex flex-wrap w-full overflow-hidden bg-gray-900 border-4 border-indigo-400 rounded-lg shadow-2xl"
      >
        <!-- Input -->
        <input
          class="w-full p-3 bg-gray-800 border-indigo-400 md:w-1/2 hover:outline-none active:outline-none focus:outline-none"
          type="text"
          v-model="email"
          placeholder="Your email"
        />

        <!-- Button -->
        <div
          class="flex items-center justify-center w-full p-3 transition-colors duration-100 ease-in bg-indigo-400 cursor-pointer md:w-1/2 hover:bg-indigo-600"
        >
          <h3 class="text-center">Join my newsletter 💌</h3>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script>
export default {
  name: 'Subscribe',

  data: () => ({
    mounted: false,
    email: '',
  }),

  computed: {
    values() {
      if (this.mounted) {
        return {
          offset: 0,
          opacity: 1,
        }
      }

      return {
        offset: 200,
        opacity: 0,
      }
    },
  },

  mounted() {
    this.mounted = true
  },

  methods: {
    async subscribe() {
      const email = this.email

      const response = fetch('/.netlify/functions/subscribe', {
        method: 'post',
        body: JSON.stringify({
          email: email,
        }),
      })
    },
  },
}
</script>

<style scoped></style>
