import React, { Component } from 'react'

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
    this.props.handleLogin(this.state)
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
            className="login-input"
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

// export const mapDispatchToProps = (dispatch) => ({
//   setUser: (user) => dispatch(setUser(user))
// })

export default LoginForm