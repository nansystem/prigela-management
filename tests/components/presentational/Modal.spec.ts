import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../../../components/presentational/Modal.vue'

describe('Modal.vue', () => {
  it('renders when modelValue is true', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      }
    })
    expect(wrapper.find('.fixed').exists()).toBe(true)
  })

  it('does not render when modelValue is false', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: false
      }
    })
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('emits update:modelValue false when close button is clicked', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('renders title slot content', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      },
      slots: {
        title: '<div>Test Title</div>'
      }
    })
    expect(wrapper.find('h3').text()).toContain('Test Title')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true
      },
      slots: {
        default: '<div>Test Content</div>'
      }
    })
    expect(wrapper.find('.modal-content').text()).toContain('Test Content')
  })
})
