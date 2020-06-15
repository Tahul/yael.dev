<template>
  <div class="w-full md:w-3/4 lg:w-2/3 xl:w-3/5">
    <div class="relative w-full mb-2">
      <form @submit.prevent="subscribe">
        <input
          v-model="email"
          :disabled="subscribed"
          type="text"
          class="bg-white shadow rounded border-2 border-transparent p-3 w-full shadow-lg text-gray-800 focus:border-transparent transition-colors ease-in-out duration-100 disabled:bg-white"
          :class="{
                'focus:outline-none': error,
                'border-red-400': error,
                'focus:border-red-400': error,
                'hover:border-red-400': error
              }"
          placeholder="yael@ipseity.fr"
        />
      </form>

      <div class="cursor-pointer absolute flex items-center justify-center right-0 top-0 h-full p-2" @click="subscribe">
        <lottie path="./animations/subscribe.json" :auto-play="false" @AnimControl="setAnimationController" />
      </div>
    </div>

    <p class="text-red-400 text-xs opacity-0 select-none w-full" :class="{ 'opacity-100': error || subscribed, 'text-red-400': error, 'text-green-400': subscribed  }">
      {{ subscribed ? locale.subscribed : error }}
    </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "SubscribeForm",

    data: () => ({
      already: false,
      animationController: null,
      storageKey: 'yael_dev_newsletter_subscription',
      subscribed: false,
      error: false,
      email: null,
    }),

    watch: {
      subscribed: {
        immediate: true,
        handler(newVal) {
          this.$emit('input', newVal)
        }
      },
      animationController(newVal) {
        if (newVal && this.subscribed) {
          this.animationController.goToAndStop(21, true)
        }
      }
    },

    computed: {
      locale() {
        if (this.$i18n.locale === 'fr') {
          return {
            validationError: 'Veuillez entrer une adresse email valide.',
            networkError: 'Une erreur est survenue lors de votre inscription à la newsletter. Veuillez réessayer.',
            subscribed: !this.already ? 'Vous êtes inscrit à ma newsletter.' : 'Vous étiez déjà inscrit à ma newsletter.',
          }
        } else {
          return {
            validationError: 'Please enter a valid email.',
            networkError: 'An error occured while subscribing you to the newsletter. Try again, please.',
            subscribed: !this.already ? 'You are now subscribed to my newsletter.' : 'You were already subscribed to my newsletter.'
          }
        }
      },
    },

    mounted() {
      if (localStorage.getItem(this.storageKey)) {
        this.subscribed = !!localStorage.getItem(this.storageKey)
        this.email = localStorage.getItem(this.storageKey)
      }
    },

    methods: {
      async subscribe() {
        const email = this.email

        if (this.subscribed) return

        if (this.validateEmail(email)) {
          try {
            const response = await axios.post(
              process.env.NODE_ENV === "development" ? 'http://localhost:8888/.netlify/functions/subscribe' : '/.netlify/functions/subscribe',
              JSON.stringify({
                email
              })
            )

            if (response.data.already) {
              this.already = true
            }

            this.animationController.addEventListener('enterFrame', (animation) => {
              if (animation.currentTime > 21) {
                this.animationController.pause();
              }
            })

            this.animationController.goToAndPlay(0, true)

            localStorage.setItem(this.storageKey, email)

            this.subscribed = true
          } catch (e) {
            console.log(e)
            this.setError(this.locale.networkError)
          }
        } else {
          this.setError(this.locale.validationError)
        }
      },

      setError(error) {
        if (!this.error) {
          this.error = error

          setTimeout(() => this.error = false, 1000)
        }
      },

      setAnimationController(controller) {
        this.animationController = controller
      },

      /**
       * Validates an email w/ RFC2822 regex
       *
       * @param {string} email
       * @returns {boolean}
       */
      validateEmail(email) {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        return re.test(email);
      }
    }
  }
</script>

<style scoped>
  input {
    outline-color: #5a67d8;
  }
</style>
