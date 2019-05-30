import React from 'react'
import { Footer } from './Footer'
import { shallow } from 'enzyme'

describe('Footer', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })
})
