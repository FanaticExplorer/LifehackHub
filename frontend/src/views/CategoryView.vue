<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <v-btn 
          @click="goBack" 
          color="primary" 
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-3"
        >
          Back to Categories
        </v-btn>
        
        <h1 class="text-h3 text-center mb-5 text-capitalize">{{ displayTitle }}</h1>
        <p class="text-center text-h6 mb-5">{{ lifehacks.length }} lifehacks</p>
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
          class="hover-card"
          elevation="2"
        >
          <v-card-title>{{ lifehack.title }}</v-card-title>
          
          <v-card-subtitle class="mt-2">
            <v-icon 
              size="small" 
              :color="getCategoryColor(lifehack.category)"
              class="mr-1"
            >
              {{ getCategoryIcon(lifehack.category) }}
            </v-icon>
            {{ lifehack.category }}
          </v-card-subtitle>
          
          <v-card-text>
            {{ lifehack.content.substring(0, 120) }}...
          </v-card-text>
          
          <v-card-actions>
            <v-chip :color="getDifficultyColor(lifehack.difficulty)" size="small">
              {{ lifehack.difficulty }}
            </v-chip>
            <v-spacer></v-spacer>
            <v-btn 
              variant="text" 
              size="small"
              @click.stop="goToLifehack(lifehack.id)"
            >
              Read More
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
.hover-card {
  cursor: pointer;
  transition: transform 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.hover-card:hover {
  transform: translateY(-4px);
}
</style>
