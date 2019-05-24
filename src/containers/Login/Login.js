import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUser, setRole } from '../../actions'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import { handlePost } from '../../thunks/handlePost'
import { withRouter } from 'react-router-dom'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
        newUser: false
    }
  }

  createAccount = () => {
    this.setState({
      newUser: true
    })
  }

  handleLogin = (user) => {
    if(!this.state.newUser) {
      this.loginUser(user)
    } else {
      this.registerUser(user)
    }
  }

  loginUser = async (user) => {
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/users/login"
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: user.emailInput,
        password: user.passwordInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    this.props.handlePost(url, options)
    const data = await this.props.handlePost(url, options)
    this.handleUser(data)
  }

  registerUser = async (user) => {
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/users/register"
    const options = {
      method: 'POST',
      body: JSON.stringify({
        fullName: user.full_name,
        role: user.role,
        email: user.email,
        password: user.password_1
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = await this.props.handlePost(url, options)
    this.handleUser(data)
  }

  handleUser = (data) => {
    const validUser = data.api_key
    const userRole = data.role
    this.props.setUser(validUser)
    this.props.setRole(userRole)
    this.handleRedirect()
  }

  handleRedirect = () => {
    if (this.props.role === 'Student') {
      //We'll want to change this to push to StudentDashboard
      this.props.history.push('/dashboard')
    } else {
      this.props.history.push('/dashboard')
    }
  }

  render() {
    return(
      <div className='login-landing'>
        {!this.state.newUser && 
          <LoginForm 
            createAccount={this.createAccount}
            handleLogin={this.handleLogin}
          />}
        {this.state.newUser && 
          <RegisterForm 
            handleLogin={this.handleLogin}
          />}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  role: state.role
})

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setRole: (role) => dispatch(setRole(role))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))