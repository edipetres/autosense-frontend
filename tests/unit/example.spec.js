import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import FleetMap from '@/components/FleetMap.vue'

describe('FleetMap.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(FleetMap, {
      propsData: { msg }
    })
    
    expect(wrapper.text()).to.include(msg)
  })
})
