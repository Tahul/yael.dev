<template>
  <Motion tag="div" spring="noWobble" :values="values">
    <div
      slot-scope="_props"
      :style="{
        opacity: `${_props.opacity}`,
      }"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-hidden"
    >
      <div
        class="absolute top-0 left-0 z-10 w-full h-full bg-indigo-600 opacity-50"
      />

      <subscribe-box
        class="z-20 mx-6 md:w-3/4 lg:w-2/3 xl:w-3/5 md:mx-0"
        :style="{ transform: `translateY(${_props.offset}px)` }"
        @close="close"
        v-model="subscribed"
      />
    </div>
  </Motion>
</template>

<script>
import SubscribeBox from '../global/SubscribeBox'

export default {
  name: 'LeaveModal',

  components: { SubscribeBox },

  data: () => ({
    closedKey: 'yael_dev_popup_closed',
    subscribed: false,
    out: false,
    closedAt: null,
  }),

  watch: {
    out(newVal) {
      this.$emit('input', newVal)
    },
  },

  computed: {
    values() {
      if (this.out) {
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

    closedRecently() {
      if (this.closedAt && this.closedAt > Date.now() - 1000 * 60 * 1440) {
        return true
      }
    },
  },

  mounted() {
    if (localStorage.getItem(this.closedKey)) {
      this.closedAt = parseInt(localStorage.getItem(this.closedKey))
    }

    document.addEventListener('mouseout', this.eventListener)

    this.$nextTick(() => {
      this.mounted = true
    })
  },

  beforeDestroy() {
    document.removeEventListener('mouseout', this.eventListener)
  },

  methods: {
    eventListener(e) {
      if (this.subscribed || this.closedRecently) return

      e = e ? e : window.event

      const from = e.relatedTarget || e.toElement

      if (!from || from.nodeName == 'HTML') {
        this.$forceUpdate()
        this.out = true
      }
    },

    close() {
      this.out = false

      const closedDate = Date.now()

      this.closedAt = closedDate

      localStorage.setItem(this.closedKey, closedDate)
    },
  },
}
</script>
