import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MaterialForm from '../../../../components/container/material/MaterialForm.vue'

describe('MaterialForm', () => {
  it('renders form fields', () => {
    const wrapper = mount(MaterialForm)
    expect(wrapper.find('input[name="name"]').exists()).toBe(true)
    expect(wrapper.find('input[name="unit_quantity"]').exists()).toBe(true)
    expect(wrapper.find('input[name="unit_type"]').exists()).toBe(true)
    expect(wrapper.find('input[name="price"]').exists()).toBe(true)
  })

  it('emits submit event with form data', async () => {
    const wrapper = mount(MaterialForm)
    await wrapper.find('input[name="name"]').setValue('Test Material')
    await wrapper.find('input[name="unit_quantity"]').setValue('10')
    await wrapper.find('input[name="unit_type"]').setValue('kg')
    await wrapper.find('input[name="price"]').setValue('1000')
    await wrapper.find('form').trigger('submit.prevent')

    const emitted = wrapper.emitted('submit')
    expect(emitted).toBeTruthy()
    if (emitted) {
      expect(emitted[0]).toEqual([
        {
          name: 'Test Material',
          unit_quantity: 10,
          unit_type: 'kg',
          price: 1000
        }
      ])
    }
  })
})
