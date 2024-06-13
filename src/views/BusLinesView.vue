<template>
  <div class="bus-lines px-4 pt-4">
    <p class="bus-lines__header">Select Bus Line</p>
    <BusLinesList :bus-lines="busLines" @line-selected="handleLineSelected" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import BusLinesList from '@/components/BusLinesList.vue'
import { BusStopTimetable, BusLine } from '@/types/BusStopTimetable'

const store = useStore()
const busStopsTimetable = computed(
  () => store.getters.busStopsTimetable as BusStopTimetable
)
const busLines = computed(() => Object.keys(busStopsTimetable.value))

const selectedLine = ref<keyof BusStopTimetable | null>(null)
const selectedStop = ref<string | null>(null)
const selectedLineStops = ref<BusLine>({})

const handleLineSelected = (line: keyof BusStopTimetable) => {
  selectedLine.value = line
  selectedLineStops.value = selectedLine.value
    ? busStopsTimetable.value[selectedLine.value]
    : {}
  selectedStop.value = null
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';
@import '../styles/_mixins';

.bus-lines {
  background-color: $white;

  &__header {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
