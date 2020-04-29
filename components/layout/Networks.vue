<template>
  <ul class="flex flex-row items-center justify-between w-full md:w-auto">
    <li>
      <a href="https://twitter.com/yaeeelglx" target="_blank">
        <twitter />
      </a>
    </li>
    <li>
      <a href="https://github.com/Tahul" target="_blank">
        <git-hub />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/in/yaelguilloux" target="_blank">
        <linked-in />
      </a>
    </li>
  </ul>
</template>

<script>
import GitHub from '@/assets/img/github.svg?inline'
import LinkedIn from '@/assets/img/linkedin.svg?inline'
import Twitter from '@/assets/img/twitter.svg?inline'

export default {
  name: 'Networks',

  components: {
    GitHub,
    Twitter,
    LinkedIn,
  },
}
</script>

<style scoped>
ul {
  & li {
    @apply cursor-pointer;

    @screen md {
      @apply mr-4;
    }

    & svg {
      transition: fill 0.1s ease-in-out;
      fill: white;

      &:hover {
        fill: #7f9cf5;
      }
    }
  }
}
</style>
