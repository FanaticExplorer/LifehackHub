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
        <LifehackCard
          :title="lifehack.title"
          :category="lifehack.category"
          :content="lifehack.content"
          :isLiked="isLiked(lifehack.id)"
          @click="goToLifehack(lifehack.id)"
          @toggle-like="toggleLike(lifehack.id)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'
import { useLikesStore } from '../stores/likesStore'
import LifehackCard from '../components/lifehack/LifehackCard.vue'

export default {
  name: 'CategoryView',

  components: {
    LifehackCard
  },
  
  computed: {
    store() {
      return useLifehacksStore()
    },

    likesStore() {
      return useLikesStore()
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

    toggleLike(id) {
      this.likesStore.toggleLike(id)
    },

    isLiked(id) {
      const numericId = parseInt(id)
      return this.likesStore.likedIds.includes(numericId)
    }
  }
}
</script>

<style scoped>
</style>