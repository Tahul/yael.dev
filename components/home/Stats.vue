<template>
  <div v-if="!failed" class="flex flex-wrap stats">
    <div class="flex items-center w-auto mb-2 md:mb-0">
      <though class="inline-block w-8 h-8 mr-2" />

      <p class="inline-block">{{ timeSpent }} {{ locale.timeSpent }}</p>

      &nbsp;&nbsp;
    </div>
    <div class="flex items-center w-auto mb-2 md:mb-0">
      <commit class="inline-block w-8 h-8 mr-2" />

      <p class="inline-block">{{ commits }} {{ locale.commits }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Commit from '../../assets/img/commit.svg?inline'
import Though from '../../assets/img/though.svg?inline'

export default {
  name: 'Stats',

  components: {
    Commit,
    Though,
  },

  data: () => ({
    failed: false,
    timeSpent: '...',
    commits: '...',
  }),

  computed: {
    locale() {
      if (this.$i18n.locale === 'fr') {
        return {
          timeSpent: 'passée(s) à coder',
          commits: 'commit(s) envoyés',
        }
      } else {
        return {
          timeSpent: 'spent coding',
          commits: 'commit(s) pushed',
        }
      }
    },
  },

  mounted() {
    try {
      const response = axios.get(process.env.NUXT_ENV_METRICS_URL).then((r) => {
        this.timeSpent = r.data.wakaTime.text
        this.commits = r.data.globalCommits
      })
    } catch (e) {
      this.failed = true
    }
  },
}
</script>

<style scoped>
.stats {
  & svg {
    @apply relative;
    fill: #7f9cf5;
    bottom: -0.33rem;
  }
}
</style>
