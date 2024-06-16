import { describe, it, expect, beforeEach } from 'vitest'
import { createApp, h, nextTick } from 'vue'
import BusLinesList from '@/components/BusLinesList.vue'

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(BusLinesList, props)
    },
  })

  app.mount(container)

  return container
}

describe('BusLinesList.vue', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = createComponent({
      busLines: [1, 2, 3],
    })
  })

  it('renders bus lines', () => {
    const buttons = container.querySelectorAll('.btn')
    expect(buttons.length).toBe(3)
    expect(buttons[0].textContent).toBe('1')
    expect(buttons[1].textContent).toBe('2')
    expect(buttons[2].textContent).toBe('3')
  })

  it('applies active class to the selected line', async () => {
    const button = container.querySelector('.btn') as HTMLElement
    const clickEvent = new Event('click')
    button.dispatchEvent(clickEvent)

    await nextTick()

    expect(button.classList).toContain('active')
  })
})
