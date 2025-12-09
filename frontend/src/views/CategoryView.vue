<template>
  <v-container class="py-8">
    <v-row class="mt-5">
      <v-col cols="12">
        <v-btn 
          @click="goBack" 
          color="primary" 
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to Categories
        </v-btn>
        
        <h1 class="text-h3 text-center mb-3 font-weight-bold text-capitalize">
          {{ displayTitle }}
        </h1>
        <div class="text-center mb-8">
          <v-chip color="primary" variant="tonal">
            {{ lifehacks.length }} lifehacks
          </v-chip>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        v-for="lifehack in lifehacks" 
        :key="lifehack.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card 
          @click="goToLifehack(lifehack.id)" 
          class="lifehack-card"
          elevation="2"
          hover
        >
          <v-card-title class="d-flex align-center pa-4">
            <v-icon :color="getCategoryColor(lifehack.category)" class="mr-3" size="large">
              {{ getCategoryIcon(lifehack.category) }}
            </v-icon>
            <span>{{ lifehack.title }}</span>
          </v-card-title>
          
          <v-divider></v-divider>
          
          <v-card-text class="py-4">
            {{ lifehack.content.substring(0, 120) }}...
          </v-card-text>
          
          <v-card-actions class="px-4 pb-4">
            <v-chip 
              size="small" 
              :color="getCategoryColor(lifehack.category)"
              variant="tonal"
            >
              {{ lifehack.category }}
            </v-chip>
            <v-chip :color="getDifficultyColor(lifehack.difficulty)" size="small" class="ml-2">
              {{ lifehack.difficulty }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn 
              variant="text" 
              size="small"
              color="primary"
              @click.stop="goToLifehack(lifehack.id)"
              append-icon="mdi-arrow-right"
            >
              Read
            </v-btn>
          </v-card-actions>
        </v-card>
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
  },

  methods: {
    goBack() {
      this.$router.push('/')
    },

    goToLifehack(id) {
      this.$router.push('/lifehack/' + id)
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
.lifehack-card {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 4px solid transparent;
}

.lifehack-card:hover {
  border-left-color: rgb(var(--v-theme-primary));
  transform: translateY(-4px);
}
</style>
