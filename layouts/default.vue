<template>
  <div
    class="w-full px-4 mb-8 text-white transition-all duration-100 linear md:px-16 lg:px-32 xl:px-64"
  >
    <topbar />

    <nuxt />
  </div>
</template>

<script>
import Topbar from '../components/layout/Topbar'

export default {
  name: 'DefaultLayout',

  components: {
    Topbar,
  },
}
</script>
