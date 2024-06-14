<template>
  <div class="container my-5">
    <h4 class="mb-4">Timetable</h4>
    <TimetableNav />
    <div class="mt-3">
      <div v-if="isLoading" class="text-center">Loading...</div>
      <div v-else-if="fetchError" class="text-center text-danger">
        {{ fetchError }}
      </div>
      <RouterView v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimetableNav from '../components/TimetableNav.vue'
import { onMounted } from 'vue'
import { useBusStops } from '@/composables/useBusStops'

const { fetchBusStops, isLoading, fetchError } = useBusStops()

onMounted(() => {
  fetchBusStops()
})
</script>
