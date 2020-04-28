<template>
  <Motion tag="div" spring="noWobble" :values="values">
    <div
      slot-scope="_props"
      class="relative"
      :style="{
        transform: `translateY(${_props.offset}px)`,
        opacity: `${_props.opacity}`,
      }"
    >
      <slot />
    </div>
  </Motion>
</template>

<script>
export default {
  name: 'SlideIn',

  props: {
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  data: () => ({
    visible: false,
  }),

  computed: {
    values() {
      if (this.visible) {
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
    if (this.delay) {
      setTimeout(() => {
        this.visible = true
      }, this.delay)
    } else {
      this.visible = true
    }
  },
}
</script>
