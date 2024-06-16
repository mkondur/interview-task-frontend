import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { createApp, h, ref } from 'vue'
import BusLinesView from '@/views/BusLinesView.vue'
import { useBusStops } from '@/composables/useBusStops'

vi.mock('@/composables/useBusStops', () => ({
  useBusStops: vi.fn(),
}))

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(BusLinesView, props)
    },
  })

  app.mount(container)

  return container
}

const busLines = ref<number[]>([102])
const busStopsTimetable = ref({
  102: {
    'StopA': {
      stop: 'StopA',
      order: 18,
      times: ['10:53'],
    },
  },
})

describe('BusLines Component', () => {
  let container: HTMLElement

  beforeEach(() => {
    document.body.innerHTML = ''
    vi.resetAllMocks()
    ;(useBusStops as Mock).mockReturnValue({
      busLines,
      busStopsTimetable,
    })
  })

  it('renders BusLinesList correctly', () => {
    container = createComponent()

    const busLinesList = container.querySelector('.bus-lines')
    expect(busLinesList).toBeTruthy()
  })

  it('renders stops list correctly when a bus line is selected', async () => {
    container = createComponent()

    const lineButton = container.querySelector('.line') as HTMLElement
    await lineButton.click()

    const stopsItem = container.querySelector(
      '.select-data--bus-stop .list-group-item'
    )
    expect(stopsItem?.textContent).toContain('StopA')
  })

  it('renders lists correctly when a bus line and stop are selected', async () => {
    container = createComponent({})

    const lineButton = container.querySelector('.line') as HTMLElement
    await lineButton.click()

    const busStop = container.querySelector(
      '.select-data--bus-stop .list-group-item'
    ) as HTMLElement
    await busStop.click()

    const stopTimesList = container.querySelectorAll(
      '.select-data--stop-time .list-group-item'
    )
    expect(stopTimesList.length).toBe(1)
    expect(stopTimesList[0].textContent).toContain('10:53')
  })
})
