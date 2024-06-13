<template>
  <div class="container my-5">
    <h4 class="mb-4">Timetable</h4>
    <TimetableNav />
    <div class="mt-3">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-center text-danger">{{ error }}</div>
      <RouterView v-else />
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
