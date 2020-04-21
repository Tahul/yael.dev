<template>
  <div class="flex items-center w-full py-2">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Topbar',

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>
