import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../../../components/presentational/Button.vue'

describe('Button.vue', () => {
  it('renders label prop correctly', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Test Button',
        variant: 'primary'
      }
    })
    expect(wrapper.text()).toContain('Test Button')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Click Me',
        variant: 'primary'
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('applies correct classes for primary variant', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Primary',
        variant: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('bg-blue-500')
    expect(wrapper.classes()).toContain('hover:bg-blue-600')
  })

  it('applies correct classes for success variant', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Success',
        variant: 'success'
      }
    })
    expect(wrapper.classes()).toContain('bg-green-500')
    expect(wrapper.classes()).toContain('hover:bg-green-600')
  })

  it('applies correct classes for danger variant', () => {
    const wrapper = mount(Button, {
      props: {
        label: 'Danger',
        variant: 'danger'
      }
    })
    expect(wrapper.classes()).toContain('bg-red-500')
    expect(wrapper.classes()).toContain('hover:bg-red-600')
  })
})
