import { describe, it, expect, beforeEach } from 'vitest'
import { createApp, h, nextTick } from 'vue'
import SearchInput from '@/components/SearchInput.vue'

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(SearchInput, props)
    },
  })

  app.mount(container)

  return container
}

describe('SearchInput.vue', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = createComponent()
  })

  it('renders input element', () => {
    const input = container.querySelector('.search__input')
    expect(input).toBeTruthy()
  })

  it('applies focused class on focus', async () => {
    const input = container.querySelector('.search__input') as HTMLInputElement
    const focusEvent = new Event('focus')
    input.dispatchEvent(focusEvent)

    await nextTick()

    const searchDiv = container.querySelector('.search')
    expect(searchDiv?.classList).toContain('search--focused')
  })
})