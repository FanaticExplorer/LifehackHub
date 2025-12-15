<template>
  <v-container class="py-8">
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-3 font-weight-bold">
          Lifehack Categories
        </h1>
        <p class="text-center text-subtitle-1 mb-8 text-medium-emphasis">
          Explore practical tips to improve your daily life
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col 
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card 
          @click="goToCategory('all')" 
          class="category-card"
          elevation="2"
          hover
        >
          <v-card-text class="text-center pa-6">
            <v-icon size="56" color="primary" class="mb-3">
              mdi-view-grid
            </v-icon>
            <div class="text-h6 font-weight-bold mb-2">All Lifehacks</div>
            <div class="text-caption text-medium-emphasis">
              {{ store.allLifehacks.length }} lifehacks
            </div>
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
          class="category-card"
          elevation="2"
          hover
        >
          <v-card-text class="text-center pa-6">
            <v-icon size="56" :color="getCategoryColor(category)" class="mb-3">
              {{ getCategoryIcon(category) }}
            </v-icon>
            <div class="text-h6 font-weight-bold mb-2 text-capitalize">
              {{ category }}
            </div>
            <div class="text-caption text-medium-emphasis">
              {{ getCategoryCount(category) }} lifehacks
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'
import { getCategoryIcon, getCategoryColor } from '../utils/categoryHelpers'

export default {
  name: 'HomeView',

  computed: {
    store() {
      return useLifehacksStore()
    },

    categories() {
      return this.store.categories
    }
  },

  methods: {
    goToCategory(category) {
      this.$router.push('/category/' + category)
    },

    getCategoryCount(category) {
      const lifehacks = this.store.getByCategory(category)
      return lifehacks.length
    },

    getCategoryIcon,
    getCategoryColor
  }
}
</script>

<style scoped>
.category-card {
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid transparent;
  border-radius: 24px;
  background: var(--lhh-category-gradient);
  box-shadow: var(--lhh-card-shadow);
}

.category-card:hover {
  border-left-color: rgb(var(--v-theme-primary));
  transform: translateY(-6px);
  box-shadow: var(--lhh-card-hover-shadow);
}

.category-card:hover .v-icon {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>
