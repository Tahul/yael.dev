<template>
  <div class="w-full rounded-lg bg-gray" v-if="!failed">
    <div class="flex flex-wrap mb-0 md:mb-2 stats">
      <div class="flex items-center w-auto mb-2 mr-2 md:mb-0">
        <though class="inline-block w-6 h-6 mr-2 md:w-8 md:h-8" />

        <p class="inline-block truncate">
          {{ timeSpent }} {{ locale.timeSpent }}
        </p>
      </div>
      <div class="flex items-center w-auto mb-2 md:mb-0">
        <commit class="inline-block w-6 h-6 mr-2 md:w-8 md:h-8" />

        <p class="inline-block truncate">{{ commits }} {{ locale.commits }}</p>
      </div>
    </div>

    <div
      class="flex items-center w-auto mb-0 md:mb-2 stats"
      :title="locale.latestStar"
      :alt="locale.latestStar"
    >
      <star class="inline-block w-6 h-6 mr-2 md:w-8 md:h-8" />

      <a :href="latestStar.url" target="_blank" class="inline-block truncate">{{
        latestStar.full_name
      }}</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Commit from '../../assets/img/commit.svg?inline'
import Though from '../../assets/img/though.svg?inline'
import Star from '../../assets/img/star.svg?inline'

export default {
  name: 'Stats',

  components: {
    Commit,
    Though,
    Star,
  },

  data: () => ({
    failed: false,
    timeSpent: '...',
    commits: '...',
    latestStar: '...',
  }),

  computed: {
    locale() {
      if (this.$i18n.locale === 'fr') {
        return {
          title: 'Mes statistiques quotidiennes',
          timeSpent: "passées à coder aujourd'hui",
          commits: 'commits',
          latestStar: 'Ma dernière étoile GitHub',
        }
      } else {
        return {
          title: 'My daily metrics',
          timeSpent: 'spent coding today',
          commits: 'commits',
          latestStar: 'My GitHub latest star',
        }
      }
    },
  },

  mounted() {
    try {
      const response = axios.get(process.env.NUXT_ENV_METRICS_URL).then((r) => {
        this.timeSpent = r.data.wakaTime.text
        this.commits = r.data.globalCommits
        this.latestStar = r.data.githubStars[0]
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
