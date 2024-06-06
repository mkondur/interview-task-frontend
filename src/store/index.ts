import { createStore } from 'vuex'
import { BusStop } from '@/types/BusStop'
import { getBusStops } from '@/services/api'

interface State {
  busStops: BusStop[]
  loading: boolean
  error: string | null
}

export default createStore({
  state: {
    busStops: [],
    loading: false,
    error: null,
  },
  getters: {
    busStops: (state: State) => state.busStops,
    loading: (state: State) => state.loading,
    error: (state: State) => state.error,
  },
  mutations: {
    setBusStops(state: State, busStops: BusStop[]) {
      state.busStops = busStops
    },
    setLoading(state: State, loading: boolean) {
      state.loading = loading
    },
    setError(state: State, error: string | null) {
      state.error = error
    },
  },
  actions: {
    async fetchBusStops({ commit }) {
      commit('setLoading', true)
      commit('setError', null)
      try {
        const response = await getBusStops()
        commit('setBusStops', response.data.stops)
      } catch (error) {
        commit('setError', 'Failed to fetch bus stops')
      } finally {
        commit('setLoading', false)
      }
    },
  },
  modules: {},
})
