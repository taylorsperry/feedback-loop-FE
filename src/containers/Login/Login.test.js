import React from 'react'
import { shallow } from 'enzyme'
import { Login, mapDispatchToProps } from './Login'
import { setUser, setRole } from '../../actions'
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

  it('should dispatch handlePost when loginUser is called', async () => {
    const url = 'https://turing-feedback-api.herokuapp.com/api/v1/users/login'
    const user = { 
                  name: 'Carlos', 
                  emailInput: 'user@gmail.com'}
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({ 
              email: 'user@gmail.com'
            }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    wrapper.instance().loginUser(user)
    expect(wrapper.instance().props.handlePost).toHaveBeenCalledWith(url, mockOptions)
  });

  it('should dispatch handlePost when registerUser is called', async () => {
    const url = 'https://turing-feedback-api.herokuapp.com/api/v1/users/register'
    const user = { 
                  name: 'Carlos', 
                  emailInput: 'user@gmail.com'}
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    wrapper.instance().registerUser(user)
    expect(wrapper.instance().props.handlePost).toHaveBeenCalledWith(url, mockOptions)
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

  it.skip('should navigate to /student-dashboard if the role is Student', () => {
    
  })

  it.skip('should navigate to /dashboard if the role is NOT student', () => {

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

    it('should return handlePost to dispatch', () => {
      const mockUrl = 'www.post.com'
      const mockOptions = {
        method: 'POST',
        body: { name: "name",
                email: "email@gmail.com"
              },
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const mockDispatch = jest.fn()
      const handlePost = jest.fn()
      const actionToDispatch = handlePost(mockUrl, mockOptions)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.handlePost(mockUrl, mockOptions)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should return setRole to dispatch', () => {
      const mockRole = 'Student'
      const mockDispatch = jest.fn()
      const actionToDispatch = setRole(mockRole)
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.setRole(mockRole)

      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
  })
})