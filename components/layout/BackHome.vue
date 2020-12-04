<template>
  <nuxt-link
    class="flex items-center justify-between mr-4 home"
    :to="$i18n.locale === 'fr' ? '/fr' : '/'"
    v-if="!isHome"
  >
    <span class="w-6 text-xl"> 🏡 </span>
    <span class="w-auto">
      {{ locale }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  name: 'BackHome',

  computed: {
    locale() {
      if (this.$i18n.locale === 'fr') {
        return 'Accueil'
      } else {
        return 'Home'
      }
    },
    isHome() {
      return (
        this.$route && this.$route.name && this.$route.name.includes('index')
      )
    },
  },
}
</script>

<style scoped>
.home {
  width: 5.5rem;
}
</style>
