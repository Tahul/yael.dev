<template>
  <div v-if="!failed" class="flex stats">
    <div class="flex items-center w-auto">
      <though class="inline-block mr-2" />

      <p class="inline-block">{{ timeSpent }} {{ locale.timeSpent }}</p>
    </div>
    <div class="flex items-center w-auto ml-2">
      <commit class="inline-block mr-2" />

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
          timeSpent: "passées à coder aujourd'hui",
          commits: 'commits envoyés',
        }
      } else {
        return {
          timeSpent: 'spent coding today',
          commits: 'commits pushed',
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
