<script>
import MainAppBar from './components/common/MainAppBar.vue'

export default {
  name: 'App',
  components: {
    MainAppBar
  },
  data() {
    return {
      showScrollToTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showScrollToTop = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<template>
  <v-app>
    <MainAppBar />
    <v-main>
      <router-view></router-view>
    </v-main>

    <v-btn
      v-show="showScrollToTop"
      icon="mdi-arrow-up"
      color="primary"
      position="fixed"
      location="bottom right"
      class="mb-4 mr-4"
      elevation="4"
      @click="scrollToTop"
      style="z-index: 1000;"
    ></v-btn>
  </v-app>
</template>

<style scoped>
</style>
