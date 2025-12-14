<template>
  <v-container class="py-8">
    <v-row class="mt-5" v-if="lifehack">
      <v-col cols="12">
        <v-btn 
          @click="goBack" 
          color="primary" 
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back
        </v-btn>
      </v-col>

      <v-col cols="12" md="10" offset-md="1" lg="8" offset-lg="2">
        <v-card elevation="3">
          <v-card-title class="pa-6 d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-icon :color="getCategoryColor(lifehack.category)" size="x-large" class="mr-4">
                {{ getCategoryIcon(lifehack.category) }}
              </v-icon>
              <span class="text-h4">{{ lifehack.title }}</span>
            </div>
            <v-btn
              :icon="isLiked(lifehack.id) ? 'mdi-heart' : 'mdi-heart-outline'"
              :color="isLiked(lifehack.id) ? 'red' : 'grey'"
              variant="text"
              @click="toggleLike(lifehack.id)"
            ></v-btn>
          </v-card-title>

          <v-card-subtitle class="px-6 pb-4">
            <v-chip 
              :color="getCategoryColor(lifehack.category)" 
              class="mr-3"
              @click="goToCategory(lifehack.category)"
              variant="tonal"
            >
              {{ lifehack.category }}
            </v-chip>

            <v-chip 
              :color="getDifficultyColor(lifehack.difficulty)"
            >
              {{ lifehack.difficulty }}
            </v-chip>
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text class="px-6 py-6 text-body-1">
            {{ lifehack.content }}
          </v-card-text>

          <v-divider v-if="lifehack.link"></v-divider>

          <v-card-actions
            v-if="lifehack.link"
            class="px-6 py-5"
          >
            <v-btn
              :href="lifehack.link"
              target="_blank"
              color="primary"
              variant="flat"
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
        <v-icon size="80" color="grey" class="mb-5">mdi-alert-circle-outline</v-icon>
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
import { useLikesStore } from '../stores/likesStore'

export default {
  name: 'LifehackView',
  
  computed: {
    store() {
      return useLifehacksStore()
    },

    likesStore() {
      return useLikesStore()
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

    toggleLike(id) {
      this.likesStore.toggleLike(id)
    },

    isLiked(id) {
      const numericId = parseInt(id)
      return this.likesStore.likedIds.includes(numericId)
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

<style scoped>
</style>
