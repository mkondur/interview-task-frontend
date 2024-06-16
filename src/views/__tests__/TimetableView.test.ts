import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { createApp, h, ref } from 'vue'
import TimetableView from '@/views/TimetableView.vue'
import { useBusStops } from '@/composables/useBusStops'
import { createRouter, createMemoryHistory } from 'vue-router'

vi.mock('@/composables/useBusStops', () => ({
  useBusStops: vi.fn(),
}))

const routes = [
  { path: '/', component: {} },
  { path: '/stops', component: {} },
]

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  const app = createApp({
    render() {
      return h(TimetableView, props)
    },
  })

  app.use(router)
  app.mount(container)

  return container
}

describe('Timetable Component', () => {
  let container: HTMLElement
  let fetchBusStopsMock: Mock

  beforeEach(() => {
    document.body.innerHTML = ''
    vi.resetAllMocks()
    fetchBusStopsMock = vi.fn()
    ;(useBusStops as Mock).mockReturnValue({
      fetchBusStops: fetchBusStopsMock,
      isLoading: ref(false),
      fetchError: ref(null),
    })
  })

  it('renders loading state correctly', () => {
    (useBusStops as Mock).mockReturnValue({
      fetchBusStops: fetchBusStopsMock,
      isLoading: ref(true),
      fetchError: ref(null),
    })

    container = createComponent()

    const loadingDiv = container.querySelector('.text-center')
    expect(loadingDiv).toBeTruthy()
    expect(loadingDiv?.textContent).toBe('Loading...')
  })

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch bus stops'
    ;(useBusStops as Mock).mockReturnValue({
      fetchBusStops: fetchBusStopsMock,
      isLoading: ref(false),
      fetchError: ref(errorMessage),
    })

    container = createComponent()

    const errorDiv = container.querySelector('.text-danger')
    expect(errorDiv).toBeTruthy()
    expect(errorDiv?.textContent).toBe(errorMessage)
  })

  it('renders success state with timetable content', () => {
    (useBusStops as Mock).mockReturnValue({
      fetchBusStops: fetchBusStopsMock,
      isLoading: ref(false),
      fetchError: ref(null),
    })

    container = createComponent()

    const routerView = container.querySelector('.timetable-content')
    expect(routerView).toBeTruthy()
  })
})
