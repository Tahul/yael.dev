<template>
  <div class="flex flex-wrap items-center justify-between w-full py-4">
    <networks />

    <div
      class="flex items-center justify-between w-full mt-4 md:mt-0 md:w-auto"
    >
      <back-home />
      <locale-switcher />
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher'
import Networks from './Networks'
import BackHome from './BackHome'

export default {
  name: 'Topbar',

  components: {
    LocaleSwitcher,
    Networks,
    BackHome,
  },
}
</script>
