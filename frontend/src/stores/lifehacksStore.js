import { defineStore } from 'pinia'
import lifehacksData from '../lifehacks.json'

export const useLifehacksStore = defineStore('lifehacks', {
  state: () => {
    return {
      lifehacks: lifehacksData
    }
  },

  getters: {
    allLifehacks(state) {
      return state.lifehacks
    },

    categories(state) {
      const categoryList = []
      
      for (let i = 0; i < state.lifehacks.length; i++) {
        const category = state.lifehacks[i].category
        if (!categoryList.includes(category)) {
          categoryList.push(category)
        }
      }
      
      categoryList.sort()
      return categoryList
    },

    getById(state) {
      return (id) => {
        const numericId = parseInt(id)
        
        for (let i = 0; i < state.lifehacks.length; i++) {
          if (state.lifehacks[i].id === numericId) {
            return state.lifehacks[i]
          }
        }
        
        return null
      }
    },

    getByCategory(state) {
      return (category) => {
        const filtered = []
        
        for (let i = 0; i < state.lifehacks.length; i++) {
          if (state.lifehacks[i].category === category) {
            filtered.push(state.lifehacks[i])
          }
        }
        
        filtered.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })
        
        return filtered
      }
    },

    searchLifehacks(state) {
      return (query) => {
        if (!query || query === '') {
          return []
        }
        
        const searchQuery = query.toLowerCase()
        const results = []
        
        for (let i = 0; i < state.lifehacks.length; i++) {
          const lifehack = state.lifehacks[i]
          const titleLower = lifehack.title.toLowerCase()
          const contentLower = lifehack.content.toLowerCase()
          
          if (titleLower.includes(searchQuery) || contentLower.includes(searchQuery)) {
            results.push(lifehack)
          }
        }
        
        results.sort((a, b) => {
          if (a.title < b.title) return -1
          if (a.title > b.title) return 1
          return 0
        })
        
        return results
      }
    },

  },

  actions: {
    pickRandomLifehack() {
      const totalLifehacks = this.lifehacks.length
      if (totalLifehacks === 0) {
        return null
      }

      const randomIndex = Math.floor(Math.random() * totalLifehacks)
      return this.lifehacks[randomIndex]
    }
  }
})
