import { Store } from 'vuex'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import busStopsStore, { State } from '../index'
import { getBusStops } from '@/services/api'

const busStopMock = {
  line: 105,
  stop: 'Cmentarz Rakowicki',
  order: 9,
  time: '17:44',
}

vi.mock('@/services/api', () => ({
  getBusStops: vi.fn(),
}))

describe('busStops store', () => {
  let store: Store<State>

  beforeEach(() => {
    store = busStopsStore
  })

  // State tests
  it('has an initial state', () => {
    expect(store.state.busStops).toEqual([])
    expect(store.state.loading).toBe(false)
    expect(store.state.error).toBeNull()
  })

  // Getter tests
  it('busStops getter returns bus stops', () => {
    store.state.busStops = [busStopMock]
    expect(store.getters.busStops).toEqual([busStopMock])
  })

  it('loading getter returns loading state', () => {
    store.state.loading = true
    expect(store.getters.loading).toBe(true)
  })

  it('error getter returns error state', () => {
    store.state.error = 'Error message'
    expect(store.getters.error).toBe('Error message')
  })

  it('busStopsTimetable getter returns bus stops timetable', () => {
    store.state.busStops = [busStopMock]
    expect(store.getters.busStopsTimetable).toEqual({
      105: {
        'Cmentarz Rakowicki': {
          stop: 'Cmentarz Rakowicki',
          order: 9,
          times: ['17:44'],
        },
      },
    })
  })

  // Mutation tests
  it('setBusStops mutation sets bus stops', () => {
    store.commit('setBusStops', [busStopMock])
    expect(store.state.busStops).toEqual([busStopMock])
  })

  it('setLoading mutation sets loading', () => {
    store.commit('setLoading', true)
    expect(store.state.loading).toBe(true)
  })

  it('setError mutation sets error', () => {
    store.commit('setError', 'Error message')
    expect(store.state.error).toBe('Error message')
  })

  // Action tests
  it('fetchBusStops action fetches bus stops and commits mutations', async () => {
    ;(getBusStops as Mock).mockResolvedValueOnce({
      data: [busStopMock],
    })

    await store.dispatch('fetchBusStops')

    expect(store.state.loading).toBe(false)
    expect(store.state.error).toBeNull()
    expect(store.state.busStops).toEqual([busStopMock])
  })

  it('fetchBusStops action handles error', async () => {
    ;(getBusStops as Mock).mockRejectedValueOnce(
      new Error('Failed to fetch bus stops')
    )

    await store.dispatch('fetchBusStops')

    expect(store.state.loading).toBe(false)
    expect(store.state.error).toBe('Failed to fetch bus stops')
  })
})
