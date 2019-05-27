import React, { Component } from 'react'
import cogoToast from 'cogo-toast';

export class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
        emailInput: '',
        passwordInput: '',
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name] : value
    })
  }

  checkUser = (e) => {
    e.preventDefault()
    if(!this.state.emailInput || !this.state.passwordInput) {
      this.sendToast('Please enter an email and password to login')
    } else {
      this.props.handleLogin(this.state)
    }
  }

  sendToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  render() {
    return(
      <form className='login-form'>
        <div className='email'>
          <label>Email</label>
          <input 
            type="email" 
            onChange={this.handleChange}  
            name="emailInput"
            className="login-input email-input"
          />
        </div>
        <div className='password'>
          <label>Password</label>
          <input 
            type="password" 
            onChange={this.handleChange}  
            name="passwordInput"
            className="login-input"
          />
        </div>
        <button className='login-button' onClick={this.checkUser}>
          Login
        </button>
        <button className='login-button' onClick={this.props.createAccount}>Create New Account</button>
      </form>
    )
  }
}

export default LoginForm