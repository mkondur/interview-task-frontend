import axios from 'axios'
import { BusStop } from '@/types/BusStop'

const API_URL = 'http://localhost:3000'

export const getBusStops = () => {
  return axios.get<{ stops: BusStop[] }>(`${API_URL}/stops`)
}
