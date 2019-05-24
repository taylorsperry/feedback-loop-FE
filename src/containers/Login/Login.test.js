import React from 'react'
import { shallow } from 'enzyme'
import { Login, mapDispatchToProps } from './Login'
import { setUser } from '../../actions'
jest.mock('../../thunks/handlePost')

describe('Login', () => {
  let mockSetUser
  let mockSetRole
  let mockUser
  let wrapper
  let mockHistory = { push: jest.fn() }

  beforeEach(() => {
    mockSetUser = jest.fn()
    mockSetRole = jest.fn()
    mockUser = {
      "api_key": "6d07603f-c6d8-47e7-b48b-2fea92eb51e5",
      "full_name": "Sample User",
      "id": 2,
      "role": "Student"
    }
  

    wrapper = shallow(
      <Login 
        setUser={mockSetUser}
        setRole={mockSetRole}
        handlePost={jest.fn()}
        history={mockHistory}
      />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have a default state', () => {
    expect(wrapper.state('newUser')).toBe(false)
  })

  it('should set state when createAccount is called', () => {
    wrapper.instance().createAccount()
    expect(wrapper.state('newUser')).toBe(true)
  })

  it('should call loginUser when handleLogin is called', () => {
    const loginUserSpy = jest.spyOn(wrapper.instance(), 'loginUser')
    wrapper.setState({newUser: false})
    wrapper.instance().handleLogin()
    expect(loginUserSpy).toHaveBeenCalled()
  })

  it('should call registerUser when handleLogin is called', () => {
    const registerUserSpy = jest.spyOn(wrapper.instance(), 'registerUser')
    wrapper.setState({newUser: true})
    wrapper.instance().handleLogin()
    expect(registerUserSpy).toHaveBeenCalled()
  })

  it.skip('should dispatch handlePost when loginUser is called', async () => {
    const user = { emailInput: 'user@gmail.com', passwordInput: 'abc'}
    const data = await wrapper.instance().loginUser(user);
    // window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    //   ok: true,
    //   json: () => Promise.resolve(mockUser)
    // }))
    // console.log(data)
    // expect(wrapper.instance().props.handlePost).toHaveBeenCalled();
  });

  it.skip('should dispatch handlePost when registerUser is called', async () => {

  })

  it('should call setUser when handleUser is called', () => {
    const mockData = { api_key: 'mockApiKey', role: 'Student'}
    wrapper.instance().handleUser(mockData)
    expect(mockSetUser).toHaveBeenCalled()
  })

  it('should call setRole when handleUser is called', () => {
    const mockData = { api_key: 'mockApiKey', role: 'Student'}
    wrapper.instance().handleUser(mockData)
    expect(mockSetRole).toHaveBeenCalled()
  })

  describe('mapDispatchToProps', () => {
    it('should return setUser to dispatch', () => {
      const user = 'mockApiKey'
      const mockDispatch = jest.fn()
      const actionToDispatch = setUser(user)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.setUser(user)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})