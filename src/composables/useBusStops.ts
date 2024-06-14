import { computed } from 'vue'
import { useStore } from 'vuex'
import { BusStopTimetable } from '@/types/BusStopTimetable'

export function useBusStops() {
  const store = useStore()

  const fetchBusStops = () => {
    store.dispatch('fetchBusStops')
  }

  const isLoading = computed(() => store.getters.loading)
  const fetchError = computed(() => store.getters.error)

  const busStopsTimetable = computed(
    () => store.getters.busStopsTimetable as BusStopTimetable
  )

  const busLines = computed(() =>
    Object.keys(busStopsTimetable.value).map(Number)
  )

  const uniqueBusStopNames = computed(() => {
    const allBusStops = Object.values(busStopsTimetable.value).reduce(
      (acc: string[], value) => {
        return [...acc, ...Object.keys(value)]
      },
      []
    )

    const uniqueBusStops = [...new Set(allBusStops)]
    return uniqueBusStops
  })

  return {
    fetchBusStops,
    busStopsTimetable,
    uniqueBusStopNames,
    busLines,
    isLoading,
    fetchError,
  }
}
