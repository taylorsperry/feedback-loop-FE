import React from 'react'
import { shallow } from 'enzyme'
import { Login, mapDispatchToProps } from './Login'
import { setUser } from '../../actions'

describe('Login', () => {
  let mockSetUser
  let wrapper

  beforeEach(() => {
    mockSetUser = jest.fn()
    wrapper = shallow(
      <Login 
        setUser={mockSetUser}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should set state with a user when handleLogin is called', () => {
    const spy = jest.spyOn(wrapper.instance().props, 'setUser')
    wrapper.instance().handleLogin()
    expect(spy).toHaveBeenCalled()

  })

  describe('mapDispatchToProps', () => {
    it('should return setUser to dispatch', () => {
      const user = {
        cohort: '1811',
        id: 3,
        name: 'Jessica Hansen',
        program: 'F',
        status: 'active'
      }
      const mockDispatch = jest.fn()
      const actionToDispatch = setUser(user)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.setUser(user)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})