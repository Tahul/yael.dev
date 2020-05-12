<template>
  <div v-if="false" class="fixed w-full bottom-0 flex items-stretch justify-center left-0 py-4 px-4 md:px-16 lg:px-32 xl:px-64">
    <div class="relative w-full flex flex-wrap-reverse rounded-lg border-2 bg-gray-900 border-indigo-400 shadow-2xl overflow-hidden">
      <input class="w-full md:w-1/2 p-6 hover:outline-none active:outline-none focus:outline-none bg-gray-800 border-t-2 md:border-t-0 md:border-r-2 border-indigo-400" type="text" v-model="email">

      <div class="flex items-center justify-center p-4 w-full md:w-1/2">
        <h3 class="text-center">Liked this website ? Join my newsletter 🙂</h3>

        <div @click="subscribe">subscribe</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Subscribe",

    data: () => ({
      email: ''
    }),

    methods: {
      async subscribe() {
        const email = this.email

        const response = fetch('https://yael.dev/.netlify/functions/subscribe', {
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
