<template>
  <v-container>
    <v-row class="mt-10">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="mt-5 text-h6">Loading random lifehack...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useLifehacksStore } from '../stores/lifehacksStore'

export default {
  name: 'RandomView',

  beforeRouteEnter(to, from, next) {
    const store = useLifehacksStore()
    const randomLifehack = store.pickRandomLifehack()

    if (randomLifehack) {
      next('/lifehack/' + randomLifehack.id)
    } else {
      next('/')
    }
  }
}
</script>
