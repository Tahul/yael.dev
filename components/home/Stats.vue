<template>
  <div
    class="w-full rounded-lg bg-gray"
    v-if="!failed"
  >
    <h3 class="mb-2 text-indigo-400">{{ locale.title }}</h3>

    <div class="flex flex-wrap stats">
      <div class="flex items-center w-auto mb-2 md:mb-0 mr-2">
        <though class="inline-block w-8 h-8 mr-2" />

        <p class="inline-block">{{ timeSpent }} {{ locale.timeSpent }}</p>
      </div>
      <div class="flex items-center w-auto mb-2 md:mb-0">
        <commit class="inline-block w-8 h-8 mr-2" />

        <p class="inline-block">{{ commits }} {{ locale.commits }}</p>
      </div>
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
          title: 'Mes statistiques quotidiennes',
          timeSpent: 'passées à coder',
          commits: 'commits',
        }
      } else {
        return {
          title: 'My daily metrics',
          timeSpent: 'spent coding',
          commits: 'commits',
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
  }
}
</style>
