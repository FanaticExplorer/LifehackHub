<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-5 text-capitalize">{{ displayTitle }}</h1>
        <p class="text-center text-h6 mb-5">{{ lifehacks.length }} lifehacks</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <p class="text-center">This is a placeholder. Full implementation is yet to be done.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'

export default {
  name: 'CategoryView',
  
  computed: {
    store() {
      return useLifehacksStore()
    },

    category() {
      return this.$route.params.cat
    },

    displayTitle() {
      if (this.category === 'all') {
        return 'All Lifehacks'
      }
      return this.category
    },

    lifehacks() {
      if (this.category === 'all') {
        return this.store.allLifehacks
      }
      return this.store.getByCategory(this.category)
    }
  }
}
</script>
