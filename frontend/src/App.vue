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
  }
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary">
      <v-app-bar-title>LifehackHub</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-palette</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped></style>
