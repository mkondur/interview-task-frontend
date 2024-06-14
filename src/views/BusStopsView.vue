<template>
  <div class="bus-stops rounded-2">
    <SearchInput @search="handleSearch" class="p-2" />
    <BaseList
      :items="busStopsVisible"
      subheader="Bus Stops"
      initialOrder="asc"
    />
  </div>
</template>

<script lang="ts" setup>
import BaseList from '@/components/BaseList.vue'
import SearchInput from '@/components/SearchInput.vue'
import { ref } from 'vue'
import { useBusStops } from '@/composables/useBusStops'

const { uniqueBusStopNames } = useBusStops()

const busStopsVisible = ref<string[]>(uniqueBusStopNames.value)

const handleSearch = (query: string) => {
  const queryLowerCase = query?.toLowerCase()
  busStopsVisible.value = uniqueBusStopNames.value.filter((stop) =>
    stop.toLowerCase().includes(queryLowerCase)
  )
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables';

.bus-stops {
  background-color: $white;
}
</style>
