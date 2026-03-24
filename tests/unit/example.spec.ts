import { mount } from '@vue/test-utils'
import Tab1Page from '@/views/Tab1Page.vue'

describe('Tab1Page.vue', () => {
  it('renders the tag manager content', () => {
    const wrapper = mount(Tab1Page)

    expect(wrapper.text()).toContain('Manage your tags')
    expect(wrapper.text()).toContain('Current tags')
    expect(wrapper.text()).toContain('ionic')
  })
})
