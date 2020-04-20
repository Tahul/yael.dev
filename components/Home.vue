<template>
  <div>
    <div class="flex items-center">
      <img class="image" :src="home.profilePicture.url" />

      <h1 class="ml-4 md:ml-8">Hello, I'm Yaël</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>
