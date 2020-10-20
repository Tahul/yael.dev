<template>
  <div
    id="main"
    class="relative w-full h-full px-4 text-white transition-all duration-100 main linear"
  >
    <topbar />

    <nuxt />

    <client-only>
      <leave-modal v-show="out" v-model="out" />
    </client-only>
  </div>
</template>

<script>
import Topbar from '../components/layout/Topbar'
import Subscribe from '../components/global/Subscribe'
import LeaveModal from '../components/layout/LeaveModal'

export default {
  name: 'DefaultLayout',

  components: {
    LeaveModal,
    Topbar,
    Subscribe,
  },

  data: () => ({
    out: false,
  }),
}
</script>
