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
