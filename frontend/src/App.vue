<script>
import MainAppBar from './components/common/MainAppBar.vue'

export default {
  name: 'App',
  components: {
    MainAppBar
  }
}
</script>

<template>
  <v-app>
    <MainAppBar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
