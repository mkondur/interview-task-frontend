export interface BusStopDetails {
  stop: string
  order: number
  times: string[]
}

export interface BusLine {
  [stop: string]: BusStopDetails
}

export interface BusStopTimetable {
  [line: number]: BusLine
}
