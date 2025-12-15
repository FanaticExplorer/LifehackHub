<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    label="Search lifehacks..."
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    clearable
    class="search-field"
    color="primary"
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchBar',
  
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue']
}
</script>

<style scoped>
.search-field {
  max-width: 600px;
  margin: 0 auto;
}
</style>
