<template>
  <Motion tag="div" spring="noWobble" :values="values">
    <div
      class="relative flex items-center w-full mt-8 cursor-pointer md:mt-16"
      @mouseover="handleMouseOver"
      @mouseout="handleMouseOut"
      slot-scope="_props"
      :style="{
        transform: `translateY(${_props.offset}px)`,
        opacity: `${_props.opacity}`,
      }"
    >
      <Motion
        v-if="$slots.hoverContent"
        tag="div"
        spring="noWobble"
        :values="hoverValues"
        class="hoverContent"
      >
        <span
          slot-scope="_props"
          :style="{
            transform: `translateY(${_props.offset}px)`,
            opacity: `${_props.opacity}`,
          }"
        >
          <slot name="hoverContent" />
        </span>
      </Motion>

      <datocms-image class="image" :data="responsiveImage" />

      <div class="ml-4 truncate md:ml-8">
        <slot />
      </div>
    </div>
  </Motion>
</template>

<script>
export default {
  name: 'HomeSection',

  props: {
    index: {
      type: Number,
      required: false,
      default: 0,
    },
    responsiveImage: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    hovered: false,
    mounted: false,
  }),

  computed: {
    hoverValues() {
      if (this.hovered) {
        return {
          offset: 0,
          opacity: 1,
        }
      }

      return {
        offset: -100,
        opacity: 0,
      }
    },

    values() {
      if (this.mounted) {
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
    setTimeout(() => {
      this.mounted = true
    }, this.index * 100)
  },

  methods: {
    handleMouseOver(event) {
      this.hovered = true
    },
    handleMouseOut(event) {
      this.hovered = false
    },
  },
}
</script>
