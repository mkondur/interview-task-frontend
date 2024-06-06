<template>
  <div class="container mt-5">
    <h1>Timetable</h1>
    <TimetableNav />
    <div class="mt-4">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-if="error" class="text-center text-danger">{{ error }}</div>
      <RouterView v-if="!loading && !error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimetableNav from '../components/TimetableNav.vue'
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const loading = computed(() => store.getters.loading)
const error = computed(() => store.getters.error)

onMounted(() => {
  store.dispatch('fetchBusStops')
})
</script>
