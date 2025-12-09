<template>
  <v-container>
    <v-row class="mt-5" v-if="lifehack">
      <v-col cols="12">
        <v-btn 
          @click="goBack" 
          color="primary" 
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-3"
        >
          Back
        </v-btn>
      </v-col>

      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="3">
          <v-card-title class="text-h4 pa-5">
            {{ lifehack.title }}
          </v-card-title>

          <v-card-subtitle class="px-5 pb-3">
            <v-chip 
              :color="getCategoryColor(lifehack.category)" 
              class="mr-2"
              @click="goToCategory(lifehack.category)"
            >
              <v-icon start>{{ getCategoryIcon(lifehack.category) }}</v-icon>
              {{ lifehack.category }}
            </v-chip>

            <v-chip :color="getDifficultyColor(lifehack.difficulty)">
              {{ lifehack.difficulty }}
            </v-chip>
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text class="pa-5 text-body-1">
            {{ lifehack.content }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="pa-5" v-if="lifehack.link">
            <v-btn
              :href="lifehack.link"
              target="_blank"
              color="primary"
              variant="outlined"
              prepend-icon="mdi-open-in-new"
              block
            >
              Learn More
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center mt-10">
        <h2 class="text-h4 mb-5">Lifehack not found</h2>
        <v-btn @click="goBack" color="primary">
          Go Back
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'

export default {
  name: 'LifehackView',
  
  computed: {
    store() {
      return useLifehacksStore()
    },

    lifehackId() {
      return this.$route.params.id
    },

    lifehack() {
      return this.store.getById(this.lifehackId)
    }
  },

  methods: {
    goBack() {
      this.$router.back()
    },

    goToCategory(category) {
      this.$router.push('/category/' + category)
    },

    getCategoryIcon(category) {
      const icons = {
        productivity: 'mdi-lightning-bolt',
        health: 'mdi-heart-pulse',
        technology: 'mdi-laptop',
        home: 'mdi-home',
        study: 'mdi-book-open-page-variant',
        finance: 'mdi-cash',
        psychology: 'mdi-brain'
      }
      return icons[category] || 'mdi-star'
    },

    getCategoryColor(category) {
      const colors = {
        productivity: 'blue',
        health: 'red',
        technology: 'purple',
        home: 'green',
        study: 'orange',
        finance: 'teal',
        psychology: 'pink'
      }
      return colors[category] || 'grey'
    },

    getDifficultyColor(difficulty) {
      if (difficulty === 'easy') return 'success'
      if (difficulty === 'medium') return 'warning'
      if (difficulty === 'hard') return 'error'
      return 'grey'
    }
  }
}
</script>
