import React from 'react'
import { RegisterForm } from './RegisterForm'
import { shallow } from 'enzyme'

describe('RegisterForm', () => {
  let wrapper
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<RegisterForm 
      handleLogin={mockFn}
    />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    const expected = {
      full_name: '',
      role: '',
      email: '',
      password_1: '',
      password_2: ''
    }
    expect(wrapper.state()).toEqual(expected)
  })

  it('should set state with a role', () => {
    const mockRole = 'Instructor'
    wrapper.instance().setRole(mockRole)
    expect(wrapper.state('role')).toBe('Instructor')
  })

  it('should update state on change', () => {
    const mockEvent = { target: { name: 'full_name', value: 'First Last'}}
    wrapper.find('.full_name').simulate('change', mockEvent)
    expect(wrapper.state('full_name')).toBe('First Last')
  })

  it('should call handleLogin when checkPassword is called', () => {
    const preventDefault = { preventDefault: jest.fn() }
    const mockState = {
      full_name: 'First Last',
      role: 'Student',
      email: 'user@gmail.com',
      password_1: 'abc',
      password_2: 'abc'
    }
    wrapper.setState(mockState)
    wrapper.instance().checkPassword(preventDefault)
    expect(mockFn).toHaveBeenCalled()
  })

  it('should call sendToast when checkPassword is called with non-matching passwords', () => {
    const preventDefault = { preventDefault: jest.fn() }
    const mockState = {
      full_name: 'First Last',
      role: 'Student',
      email: 'user@gmail.com',
      password_1: 'abc',
      password_2: 'def'
    }
    const spy = jest.spyOn(wrapper.instance(), 'sendToast')
    wrapper.setState(mockState)
    wrapper.instance().checkPassword(preventDefault)
    expect(spy).toHaveBeenCalled()
  })

  it('should call sendToast on checkFields when newUser is missing required field', () => {
    const newUser = {
      full_name: 'First Last',
      role: 'Student',
      email: '',
      password_1: 'abc',
    }
    const spy = jest.spyOn(wrapper.instance(), 'sendToast')
    wrapper.instance().checkFields(newUser)
    expect(spy).toHaveBeenCalled()    
  })

  it('should call setRole onClick for student', () => {
    const spy = jest.spyOn(wrapper.instance(), 'setRole')
    wrapper.find('.student-select').simulate('click')
    expect(spy).toHaveBeenCalled()        
  })

  it('should call setRole onClick for instructor', () => {
    const spy = jest.spyOn(wrapper.instance(), 'setRole')
    wrapper.find('.instructor-select').simulate('click')
    expect(spy).toHaveBeenCalled()        
  })

})