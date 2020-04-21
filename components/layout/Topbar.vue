<template>
  <div class="flex items-center justify-between w-full py-2">
    <networks />
    <locale-switcher />
  </div>
</template>

<script>
import LocaleSwitcher from './LocaleSwitcher'
import Networks from './Networks'

export default {
  name: 'Topbar',

  components: {
    LocaleSwitcher,
    Networks,
  },
}
</script>
