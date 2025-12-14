import { defineStore } from 'pinia'

export const useLikesStore = defineStore('likes', {
  state: () => {
    return {
      likedIds: []
    }
  },

  getters: {
    isLiked(state) {
      return (id) => {
        const numericId = parseInt(id)
        
        for (let i = 0; i < state.likedIds.length; i++) {
          if (state.likedIds[i] === numericId) {
            return true
          }
        }
        
        return false
      }
    },

    favoritesList(state) {
      return state.likedIds
    },

    favoritesCount(state) {
      return state.likedIds.length
    }
  },

  actions: {
    toggleLike(id) {
      const numericId = parseInt(id)
      const index = this.likedIds.indexOf(numericId)
      
      if (index === -1) {
        this.likedIds.push(numericId)
      } else {
        this.likedIds.splice(index, 1)
      }
    }
  }
})
