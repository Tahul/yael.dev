<template>
  <Motion tag="div" spring="noWobble" :values="values">
    <div
      class="fixed w-full bottom-0 flex items-stretch justify-center left-0 py-4 px-4 md:px-16 lg:px-32 xl:px-64"
      slot-scope="_props"
      :style="{
        transform: `translateY(${_props.offset}px)`,
        opacity: `${_props.opacity}`,
      }">
      <div class="relative w-full flex flex-wrap rounded-lg border-4 bg-gray-900 border-indigo-400 shadow-2xl overflow-hidden">
        <!-- Input -->
        <input class="w-full md:w-1/2 p-3 hover:outline-none active:outline-none focus:outline-none bg-gray-800  border-indigo-400" type="text" v-model="email" placeholder="Your email">

        <!-- Button -->
        <div class="transition-colors duration-100 ease-in cursor-pointer flex items-center justify-center p-3 w-full md:w-1/2 bg-indigo-400 hover:bg-indigo-600">
          <h3 class="text-center">Join my newsletter 💌</h3>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script>
  export default {
    name: "Subscribe",

    data: () => ({
      mounted: false,
      email: ''
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
            email: email
          })
        })

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
