<template>
  <div>
    <div class="bus-lines px-4 pt-4 rounded-2">
      <p class="bus-lines__header">Select Bus Line</p>
      <BusLinesList
        :bus-lines="busLines"
        @line-selected="handleBusLineSelected"
      />
    </div>
    <div class="row gx-3 my-3">
      <div class="col-md-6">
        <div class="select-data py-4" :class="{ 'no-data': !selectedLine }">
          <p v-if="!selectedLine">Please select the bus line first</p>
          <BaseList
            v-else
            :items="selectedLineStops"
            :header="'Bus Line: ' + selectedLine"
            subheader="Bus Stops"
            itemLabelKey="stop"
            sortKey="order"
            :selectable="true"
            v-model="selectedStop"
            initialOrder="asc"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="select-data py-4"
          :class="{ 'no-data': !selectedLine || !selectedStop }"
        >
          <p v-if="!selectedLine">Please select the bus line first</p>
          <p v-else-if="!selectedStop">Please select the bus stop first</p>
          <BaseList
            v-else
            :items="selectedStopTimes"
            :header="'Bus Stop: ' + selectedStop"
            subheader="Time"
            :sortable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import BusLinesList from '@/components/BusLinesList.vue'
import BaseList from '@/components/BaseList.vue'
import { BusStopTimetable, BusStopDetails } from '@/types/BusStopTimetable'
import { sortHours } from '@/utils/sort-hours'
import { useBusStops } from '@/composables/useBusStops'

const { busLines, busStopsTimetable } = useBusStops()

const selectedLine = ref<keyof BusStopTimetable | null>(null)
const selectedStop = ref<string>()
const selectedLineStops = ref<BusStopDetails[]>([])
const selectedStopTimes = ref<string[]>([])

watch(selectedStop, () => {
  selectedStopTimes.value =
    selectedLine.value && selectedStop.value
      ? sortHours(
          busStopsTimetable.value[selectedLine.value][selectedStop.value].times
        )
      : []
})

const handleBusLineSelected = (line: keyof BusStopTimetable) => {
  selectedLine.value = line
  selectedLineStops.value = selectedLine.value
    ? [...Object.values(busStopsTimetable.value[selectedLine.value])]
    : []
  selectedStop.value = undefined
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

.select-data {
  width: 100%;
  background-color: $white;
  height: 444px;

  &.no-data {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-image-source: url('../assets/dashed-border.png');
    border-image-slice: 20;
    border-image-width: 10;
    border-radius: 4px;
  }

  p {
    color: $gray;
  }
}
</style>
