import React, { Component } from 'react'

export class RegisterForm extends Component {
  constructor() {
    super()
    this.state = {
      full_name: '',
      role: '',
      email: '',
      password_1: '',
      password_2: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name] : value
    })
  }

  checkPassword = (e) => {
    e.preventDefault()
    const { full_name, role, email, password_1, password_2 } = this.state
    if(password_1 === password_2) {
      const newUser = {
        full_name,
        role,
        email,
        password_1
      }
      this.props.handleLogin(newUser)
    } else {
      console.log('Passwords do not match')
    }
  }

  setRole = (role) => {
    this.setState({
      role
    })
  }

  render() {
    return(
      <form className='login-form'>
        <div className='full-name'>
          <label>Enter Your First and Last Name</label>
          <input 
            type="text" 
            onChange={this.handleChange}  
            name="full_name"
            className="login-input full_name"
          />
        </div>
        <div className='email'>
          <label>Email</label>
          <input 
            type="email" 
            onChange={this.handleChange}  
            name="email"
            className="login-input"
          />
        </div>
        <div className='password'>
          <label>Password</label>
          <input 
            type="password" 
            onChange={this.handleChange}  
            name="password_1"
            className="login-input"
          />
        </div>
        <div className='password'>
          <label>Confirm Password</label>
          <input 
            type="password" 
            onChange={this.handleChange}  
            name="password_2"
            className="login-input"
          />
        </div>
        <div className="role-input">
          <p className="role-input-p">I am:</p>
          <div className="role-choice">
            <input type="radio" onClick={() => {this.setRole('Instructor')}} />
            <p className="role-input-p">An Instructor</p>
          </div>
          <div className="role-choice">
            <input type="radio" onClick={() => {this.setRole('Student')}}/>
            <p className="role-input-p">A Student</p>
          </div>
        </div>
        <button className='login-button' onClick={this.checkPassword}>
          Login
        </button> 
      </form>
    )
  }
}

export default RegisterForm