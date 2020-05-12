<template>
  <div
    class="relative w-full h-full px-4 text-white transition-all duration-100 main linear md:px-16 lg:px-32 xl:px-64"
  >
    <topbar />

    <nuxt />

    <subscribe />
  </div>
</template>

<script>
import Topbar from '../components/layout/Topbar'
import Subscribe from '../components/global/Subscribe'

export default {
  name: 'DefaultLayout',

  components: {
    Topbar,
    Subscribe
  },
}
</script>
