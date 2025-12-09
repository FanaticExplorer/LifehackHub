<script>
import { useTheme } from 'vuetify'

export default {
  name: 'App',
  setup() {
    const theme = useTheme()

    const toggleTheme = () => {
      theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light'
    }

    return {
      toggleTheme
    }
  },
  
  methods: {
    goToHome() {
      this.$router.push('/')
    },

    goToRandom() {
      const randomTime = Date.now()
      this.$router.push('/random?t=' + randomTime)
    }
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="2">
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
      </v-btn>
      <v-btn 
        icon 
        @click="goToRandom" 
        variant="text"
      >
        <v-icon>mdi-dice-5</v-icon>
      </v-btn>
      <v-btn 
        icon 
        @click="toggleTheme" 
        variant="text"
      >
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
