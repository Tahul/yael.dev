<template>
  <nuxt-link
    class="flex items-center justify-between w-24"
    :to="switchLocalePath(availableLocales[0].code)"
  >
    <span class="inline-block w-2 text-xl">{{ availableLocales[0].icon }}</span>
    <span class="inline-block w-auto">{{ availableLocales[0].name }}</span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'LocaleSwitcher',

  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>
