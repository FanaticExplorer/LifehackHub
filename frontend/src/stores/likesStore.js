import { defineStore } from 'pinia'

const STORAGE_KEY = 'lifehack-favorites'

export const useLikesStore = defineStore('likes', {
  state: () => {
    return {
      likedIds: loadFromLocalStorage()
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
      
      saveToLocalStorage(this.likedIds)
    },

    clearAllFavorites() {
      this.likedIds = []
      saveToLocalStorage(this.likedIds)
    }
  }
})

function loadFromLocalStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error)
  }
  return []
}

function saveToLocalStorage(likedIds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds))
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error)
  }
}
