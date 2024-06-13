import { BusStop } from '@/types/BusStop'
import { BusStopTimetable } from '@/types/BusStopTimetable'

export const busStopsToTimetable = (busStops: BusStop[]): BusStopTimetable => {
  return busStops.reduce(
    (acc: BusStopTimetable, { line, stop, order, time }) => {
      if (!acc[line]) acc[line] = {}
      if (!acc[line][stop]) acc[line][stop] = { stop, order, times: [] }
      acc[line][stop].times.push(time)
      return acc
    },
    {}
  )
}
