<template>
  <v-container class="py-8">
    <v-row class="mt-5">
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-3 font-weight-bold">
          Favorite Lifehacks
        </h1>
        <p class="text-center text-subtitle-1 mb-8 text-medium-emphasis">
          Your collection of saved lifehacks
        </p>
      </v-col>
    </v-row>

    <v-row v-if="favoriteLifehacks.length > 0">
      <v-col cols="12">
        <h2 class="text-h5 mb-4">
          <v-icon class="mr-2" color="red">mdi-heart</v-icon>
          {{ favoriteLifehacks.length }} Favorite{{ favoriteLifehacks.length !== 1 ? 's' : '' }}
        </h2>
        
        <v-card elevation="2">
          <v-list>
            <v-list-item
              v-for="lifehack in favoriteLifehacks"
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
                <v-btn
                  icon="mdi-heart"
                  color="red"
                  variant="text"
                  size="small"
                  @click.stop="toggleLike(lifehack.id)"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center py-10">
        <v-icon size="64" color="grey">mdi-heart-outline</v-icon>
        <p class="text-h6 mt-4">No favorite lifehacks yet</p>
        <p class="text-body-2 text-medium-emphasis mt-2">
          Start exploring and save your favorite lifehacks!
        </p>
        <v-btn
          color="primary"
          class="mt-4"
          @click="goToHome"
        >
          Browse Lifehacks
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'
import { useLikesStore } from '../stores/likesStore'

export default {
  name: 'FavoritesView',
  
  computed: {
    lifehacksStore() {
      return useLifehacksStore()
    },

    likesStore() {
      return useLikesStore()
    },

    favoriteLifehacks() {
      const favorites = []
      const likedIds = this.likesStore.favoritesList
      
      for (let i = 0; i < likedIds.length; i++) {
        const lifehack = this.lifehacksStore.getById(likedIds[i])
        if (lifehack) {
          favorites.push(lifehack)
        }
      }
      
      return favorites
    }
  },

  methods: {
    goToLifehack(id) {
      this.$router.push('/lifehack/' + id)
    },

    goToHome() {
      this.$router.push('/')
    },

    toggleLike(id) {
      this.likesStore.toggleLike(id)
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
