import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../actions'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'

// Select student or instructor
// Create a new account (own endpoint) --> validate password and send { full_name: , role: , email: , password: } to BE
// Login to existing account (different endpoint) --> { email: , password: }
// Response from BE will be { id: 1, api_key: , role: , full_name: }
// action to set the API KEY in redux (already done)
// action to set role in redux
// roles will dictate if the user is pushed to InstructorDash or StudentDash

export class Login extends Component {
  constructor() {
    super()
    this.state = {
        user: 'API_KEY',
        role: 'student or instructor',
        newUser: false
    }
  }

  handleLogin = (user) => {
    console.log(user)
  }

  createAccount = () => {
    this.setState({
      newUser: true
    })
  }

  render() {
    return(
      <div className='login-landing'>
        {!this.state.newUser && <LoginForm createAccount={this.createAccount}/>}
        {this.state.newUser && <RegisterForm handleLogin={this.handleLogin}/>}
        {/* <NavLink to='/dashboard'>
          <button className='login-button' onClick={this.handleLogin}>
          Login
          </button>
        </NavLink> */}
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(Login)