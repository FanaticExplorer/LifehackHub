<template>
  <v-container>
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-5">Lifehack Categories</h1>
        
        <v-text-field
          v-model="searchQuery"
          label="Search lifehacks..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          class="mb-5"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="searchQuery && searchResults.length > 0">
      <v-col cols="12">
        <h2 class="text-h5 mb-3">Search Results ({{ searchResults.length }})</h2>
        
        <v-list>
          <v-list-item
            v-for="lifehack in searchResults"
            :key="lifehack.id"
            @click="goToLifehack(lifehack.id)"
            class="hover-list-item"
          >
            <template v-slot:prepend>
              <v-icon :color="getCategoryColor(lifehack.category)">
                {{ getCategoryIcon(lifehack.category) }}
              </v-icon>
            </template>
            
            <v-list-item-title>{{ lifehack.title }}</v-list-item-title>
            
            <v-list-item-subtitle>
              {{ lifehack.category }}
            </v-list-item-subtitle>

            <template v-slot:append>
              <v-chip :color="getDifficultyColor(lifehack.difficulty)" size="small">
                {{ lifehack.difficulty }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row v-else-if="searchQuery && searchResults.length === 0">
      <v-col cols="12" class="text-center">
        <p class="text-h6">No lifehacks found for "{{ searchQuery }}"</p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col 
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card 
          @click="goToCategory('all')" 
          class="hover-card text-center pa-5"
          elevation="2"
        >
          <v-icon size="64" color="primary">
            mdi-view-grid
          </v-icon>
          <v-card-title>All Lifehacks</v-card-title>
          <v-card-text>
            {{ store.allLifehacks.length }} lifehacks
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col 
        v-for="category in categories" 
        :key="category"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card 
          @click="goToCategory(category)" 
          class="hover-card text-center pa-5"
          elevation="2"
        >
          <v-icon size="64" :color="getCategoryColor(category)">
            {{ getCategoryIcon(category) }}
          </v-icon>
          <v-card-title class="text-capitalize">{{ category }}</v-card-title>
          <v-card-text>
            {{ getCategoryCount(category) }} lifehacks
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'

export default {
  name: 'HomeView',
  
  data() {
    return {
      searchQuery: ''
    }
  },

  computed: {
    store() {
      return useLifehacksStore()
    },

    categories() {
      return this.store.categories
    },

    searchResults() {
      return this.store.searchLifehacks(this.searchQuery)
    }
  },

  methods: {
    goToCategory(category) {
      this.$router.push('/category/' + category)
    },

    goToLifehack(id) {
      this.$router.push('/lifehack/' + id)
    },

    getCategoryCount(category) {
      const lifehacks = this.store.getByCategory(category)
      return lifehacks.length
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
}

.hover-card:hover {
  transform: translateY(-4px);
}

.hover-list-item {
  cursor: pointer;
}
</style>
