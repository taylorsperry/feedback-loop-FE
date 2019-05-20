import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Login extends Component {
  render() {
    return(
      <div>
        <header className="feedback-loop-title-text">
          Welcome to the Feedback Loop
        </header>
        <div className="button-backsplash">
          <NavLink to='/dashboard'>
            <button className='login-button'>
            Login
            </button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Login