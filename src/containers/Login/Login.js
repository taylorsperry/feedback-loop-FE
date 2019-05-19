import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Login extends Component {
  render() {
    return(
      <div>
        <header className="App-header">
          Welcome to the Feedback Loop
        </header>
        <div>
          <NavLink to='/dashboard' className='login-button'>
            <button className='login-button'>Login</button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default Login