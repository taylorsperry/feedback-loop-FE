import React from 'react'
import { shallow } from 'enzyme'
import Login from './Login'

describe('Login', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(
      <Login />
    )
    expect(wrapper).toMatchSnapshot()
  })
})