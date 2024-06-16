import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { createApp, h, ref, nextTick } from 'vue'
import BusStopsView from '@/views/BusStopsView.vue'
import { useBusStops } from '@/composables/useBusStops'

vi.mock('@/composables/useBusStops', () => ({
  useBusStops: vi.fn(),
}))

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(BusStopsView, props)
    },
  })

  app.mount(container)

  return container
}

describe('BusStops Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = ''
    vi.resetAllMocks()
    ;(useBusStops as Mock).mockReturnValue({
      uniqueBusStopNames: ref(['Stop A', 'Stop B', 'Stop C']),
    })
  })

  it('renders SearchInput and BaseList components correctly', () => {
    container = createComponent()

    const searchInput = container.querySelector('.search__input')
    const baseList = container.querySelector('.list-group')

    expect(searchInput).toBeTruthy()
    expect(baseList).toBeTruthy()
  })

  it('filters bus stops based on search query', async () => {
    container = createComponent()

    const searchInput = container.querySelector(
      '.search__input'
    ) as HTMLInputElement
    searchInput.value = 'Stop B'
    searchInput.dispatchEvent(new Event('input'))

    await nextTick()

    const listItems = container.querySelectorAll('.list-group-item')
    expect(listItems.length).toBe(1)
    expect(listItems[0].textContent).toContain('Stop B')
  })
})
