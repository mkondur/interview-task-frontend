import { describe, it, expect } from 'vitest'
import { createApp, h } from 'vue'
import BaseList from '@/components/BaseList.vue'

const createComponent = (props = {}) => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const app = createApp({
    render() {
      return h(BaseList, props)
    },
  })

  app.mount(container)

  return container
}

describe('BaseList.vue', () => {
  it('renders header and subheader correctly', () => {
    const container = createComponent({
      items: [],
      header: 'Test Header',
      subheader: 'Test Subheader',
    })

    expect(container.querySelector('.list__header')?.textContent).toBe(
      'Test Header'
    )
    expect(container.querySelector('.list__subheader span')?.textContent).toBe(
      'Test Subheader'
    )
  })

  it('renders items correctly', () => {
    const items = [
      { name: 'Item 1', order: 1 },
      { name: 'Item 2', order: 2 },
      { name: 'Item 3', order: 3 },
    ]
    const container = createComponent({
      items,
      itemLabelKey: 'name',
    })

    const listItems = container.querySelectorAll('.list-group-item')
    expect(listItems).toHaveLength(3)
    expect(listItems[0].textContent).toBe('Item 1')
    expect(listItems[1].textContent).toBe('Item 2')
    expect(listItems[2].textContent).toBe('Item 3')
  })

  it('sorts items correctly', async () => {
    const items = [
      { name: 'Item 1', order: 1 },
      { name: 'Item 2', order: 2 },
      { name: 'Item 3', order: 3 },
    ]
    const container = createComponent({
      items,
      subheader: 'Subheader',
      sortable: true,
      itemLabelKey: 'name',
      sortKey: 'order',
      initialOrder: 'asc',
    })

    const sortIcon = container.querySelector('.sort-icon') as HTMLElement
    await sortIcon.click()

    const listItems = container.querySelectorAll('.list-group-item')
    expect(listItems[0].textContent).toBe('Item 3')
    expect(listItems[1].textContent).toBe('Item 2')
    expect(listItems[2].textContent).toBe('Item 1')
  })

  it('shows "No data" when items list is empty', () => {
    const container = createComponent({
      items: [],
    })

    expect(container.querySelector('.list-group')).toBeNull()
    expect(container.querySelector('.px-4.py-2')?.textContent).toBe('No data')
  })
})
