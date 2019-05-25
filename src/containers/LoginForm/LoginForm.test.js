import React from 'react'
import { LoginForm } from './LoginForm'
import { shallow } from 'enzyme'

describe('LoginForm', () => {
  let wrapper
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<LoginForm 
      createAccount={mockFn}
      handleLogin={mockFn}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const expected = {
      emailInput: '',
      passwordInput: '',
    }
    expect(wrapper.state()).toEqual(expected)
  })

  it('should update state on change', () => {
    const mockEvent = { target: { name: 'emailInput', value: 'user@gmail.com'}}
    wrapper.find('.email-input').simulate('change', mockEvent)
    expect(wrapper.state('emailInput')).toBe('user@gmail.com')
  })

  it('should call handleLogin when checkUser is called', () => {
    const preventDefault = { preventDefault: jest.fn() }
    wrapper.instance().checkUser(preventDefault)
    expect(mockFn).toHaveBeenCalled()
  })
})