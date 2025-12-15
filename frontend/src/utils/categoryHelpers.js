export const getCategoryIcon = (category) => {
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
}

export const getCategoryColor = (category) => {
  const colors = {
    productivity: '#7bc4c4',
    health: '#ff9ba8',
    technology: '#a997ff',
    home: '#8bd4b5',
    study: '#f3c87c',
    finance: '#7ddbc0',
    psychology: '#d5a9e3'
  }
  return colors[category] || 'grey'
}
