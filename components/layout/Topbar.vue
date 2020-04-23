<template>
  <div class="flex flex-wrap items-center justify-between w-full py-2">
    <networks />

    <div class="flex items-center">
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
