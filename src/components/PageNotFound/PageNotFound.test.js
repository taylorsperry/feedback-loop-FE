import React from 'react'
import { PageNotFound } from './PageNotFound'
import { shallow } from 'enzyme'

describe('PageNotFound', () => {
  let wrapper
  it('should match the snapshot', () => {
    wrapper = shallow(<PageNotFound />)
    expect(wrapper).toMatchSnapshot()
  })
})