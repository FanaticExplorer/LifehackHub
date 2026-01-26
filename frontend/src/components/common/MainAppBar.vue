<script>
import { useTheme } from 'vuetify'

export default {
  name: 'MainAppBar',

  setup() {
    const theme = useTheme()
    return { theme }
  },

  data() {
    return {
      isDark: true
    }
  },

  computed: {
    themeIcon() {
      return this.isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'
    }
  },

  mounted() {
    this.isDark = this.theme.global.name.value === 'dark'
    this.applyBodyTheme()
    this.$watch(() => this.theme.global.name.value, () => {
      this.isDark = this.theme.global.name.value === 'dark'
      this.applyBodyTheme()
    })
  },

  methods: {
    applyBodyTheme() {
      const body = document.body
      if (!body || !this.theme) return
      const isLight = this.theme.global.name.value === 'light'
      body.classList.toggle('light-mode', isLight)
      body.classList.toggle('dark-mode', !isLight)
    },

    toggleTheme() {
      if (!this.theme) return
      this.theme.global.name.value = this.theme.global.name.value === 'light' ? 'dark' : 'light'
    },

    goToHome() {
      this.$router.push('/')
    },

    goToRandom() {
      const randomTime = Date.now()
      this.$router.push('/random?t=' + randomTime)
    },

    goToSearch() {
      this.$router.push('/search')
    },

    goToFavorites() {
      this.$router.push('/favorites')
    }
  }
}
</script>

<template>
  <v-app-bar color="surface" elevation="0" class="rounded-app-bar">
    <v-app-bar-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-lightbulb-on-outline</v-icon>
      <span class="font-weight-bold">LifehackHub</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn 
      icon 
      @click="goToHome" 
      variant="text"
    >
      <v-icon>mdi-home</v-icon>
      <v-tooltip activator="parent" location="bottom">Home</v-tooltip>
    </v-btn>
    <v-btn 
      icon 
      @click="goToRandom" 
      variant="text"
    >
      <v-icon>mdi-dice-5</v-icon>
      <v-tooltip activator="parent" location="bottom">Random Lifehack</v-tooltip>
    </v-btn>
    <v-btn 
      icon 
      @click="goToSearch" 
      variant="text"
    >
      <v-icon>mdi-magnify</v-icon>
      <v-tooltip activator="parent" location="bottom">Search</v-tooltip>
    </v-btn>
    <v-btn 
      icon 
      @click="goToFavorites" 
      variant="text"
    >
      <v-icon>mdi-heart</v-icon>
      <v-tooltip activator="parent" location="bottom">Favorites</v-tooltip>
    </v-btn>
    <v-btn 
      icon 
      @click="toggleTheme" 
      variant="text"
    >
      <v-icon>{{ themeIcon }}</v-icon>
      <v-tooltip activator="parent" location="bottom">Toggle Theme</v-tooltip>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.rounded-app-bar {
  border-radius: 0 0 28px 28px;
  background-color: var(--lhh-appbar-bg) !important;
  border-bottom: 1px solid var(--lhh-appbar-border);
  backdrop-filter: blur(10px);
}
</style>
