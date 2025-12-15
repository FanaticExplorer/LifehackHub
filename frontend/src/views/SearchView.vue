<template>
  <v-container class="py-8">
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-3 font-weight-bold">
          Search Lifehacks
        </h1>
        <p class="text-center text-subtitle-1 mb-8 text-medium-emphasis">
          Find the perfect lifehack for your needs
        </p>
        
        <SearchBar v-model="searchQuery" class="mb-5" />
      </v-col>
    </v-row>

    <v-row v-if="searchQuery && searchResults.length > 0">
      <v-col cols="12">
        <h2 class="text-h5 mb-4">
          <v-icon class="mr-2" color="primary">mdi-text-search</v-icon>
          Search Results ({{ searchResults.length }})
        </h2>
        
        <v-card elevation="2">
          <v-list>
            <v-list-item
              v-for="lifehack in searchResults"
              :key="lifehack.id"
              @click="goToLifehack(lifehack.id)"
              class="result-item"
            >
              <template v-slot:prepend>
                <v-avatar :color="getCategoryColor(lifehack.category)" size="40">
                  <v-icon color="white" size="small">
                    {{ getCategoryIcon(lifehack.category) }}
                  </v-icon>
                </v-avatar>
              </template>
              
              <v-list-item-title class="font-weight-medium">
                {{ lifehack.title }}
              </v-list-item-title>
              
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
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else-if="searchQuery && searchResults.length === 0">
      <v-col cols="12" class="text-center py-10">
        <v-icon size="64" color="grey">mdi-emoticon-sad-outline</v-icon>
        <p class="text-h6 mt-4">No lifehacks found for "{{ searchQuery }}"</p>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center py-10">
        <v-icon size="64" color="primary">mdi-magnify</v-icon>
        <p class="text-h6 mt-4">Start typing to search lifehacks</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'
import { useSearchStore } from '../stores/searchStore'
import SearchBar from '../components/common/SearchBar.vue'

export default {
  name: 'SearchView',
  
  components: {
    SearchBar
  },
  
  data() {
    return {
      searchQuery: ''
    }
  },

  computed: {
    lifehacksStore() {
      return useLifehacksStore()
    },

    searchStore() {
      return useSearchStore()
    },

    searchResults() {
      return this.lifehacksStore.searchLifehacks(this.searchQuery)
    }
  },

  watch: {
    searchQuery(newValue) {
      this.searchStore.setQuery(newValue)
    }
  },

  mounted() {
    this.searchQuery = this.searchStore.searchQuery
  },

  methods: {
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
.result-item {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.result-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}
</style>
