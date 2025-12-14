<template>
  <v-card 
    class="lifehack-card"
    elevation="2"
    hover
  >
    <v-card-title class="d-flex align-center pa-4">
      <v-icon :color="getCategoryColor(category)" class="mr-3" size="large">
        {{ getCategoryIcon(category) }}
      </v-icon>
      <span>{{ title }}</span>
    </v-card-title>
    
    <v-divider></v-divider>
    
    <v-card-text class="py-4">
      {{ content.substring(0, 120) }}...
    </v-card-text>
    
    <v-card-actions class="px-4 pb-4">
      <v-chip 
        size="small" 
        :color="getCategoryColor(category)"
        variant="tonal"
      >
        {{ category }}
      </v-chip>
      <v-spacer></v-spacer>
      <v-btn
        :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="isLiked ? 'red' : 'grey'"
        variant="text"
        size="small"
        @click.stop="$emit('toggle-like')"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LifehackCard',

  props: {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    isLiked: {
      type: Boolean,
      default: false
    }
  },

  emits: ['toggle-like'],

  methods: {
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
