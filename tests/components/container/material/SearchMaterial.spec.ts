import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchMaterial from '../../../../components/container/material/SearchMaterial.vue'

describe('SearchMaterial', () => {
  it('renders search input', () => {
    const wrapper = mount(SearchMaterial)
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('emits search event when input changes', async () => {
    const wrapper = mount(SearchMaterial)
    await wrapper.find('input').setValue('test')
    expect(wrapper.emitted()).toHaveProperty('search')
  })
})
