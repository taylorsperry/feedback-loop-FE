import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Login extends Component {
  render() {
    return(
      <div className='login-container'>
        <NavLink to='/dashboard'>
          <button className='login-button'>
          Login
          </button>
        </NavLink>
      </div>
    )
  }
}

export default Login