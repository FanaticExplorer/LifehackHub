import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      query: ''
    }
  },

  getters: {
    searchQuery(state) {
      return state.query
    }
  },

  actions: {
    setQuery(newQuery) {
      this.query = newQuery
    },

    clearQuery() {
      this.query = ''
    }
  }
})
