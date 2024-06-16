import { describe, it, expect, beforeEach } from 'vitest'
import { createApp, h } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import TimetableNav from '@/components/TimetableNav.vue'

const routes = [
  { path: '/', component: { template: '<div>Bus Lines</div>' } },
  { path: '/stops', component: { template: '<div>Stops</div>' } },
]

const createComponent = () => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  const app = createApp({
    render() {
      return h(TimetableNav)
    },
  })

  app.use(router)
  app.mount(container)

  return container
}

describe('Navigation.vue', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = createComponent()
  })

  it('renders navigation links', () => {
    const links = container.querySelectorAll('.nav-link')
    expect(links.length).toBe(2)
    expect(links[0].textContent).toBe('Bus Lines')
    expect(links[1].textContent).toBe('Stops')
  })
})
