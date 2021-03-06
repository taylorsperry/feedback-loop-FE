import React, { Component } from 'react'
import cogoToast from 'cogo-toast';

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
      this.checkFields(newUser)
    } else {
      this.sendToast('Passwords do not match')
    }
  }

  setRole = (role) => {
    this.setState({
      role
    })
  }

  sendToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  checkFields = (newUser) => {
    if(!newUser.full_name || !newUser.role || !newUser.email || !newUser.password_1) {
      this.sendToast('Please complete all fields to create new account')
    } else {
      this.props.handleLogin(newUser)
    }
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
            <input className="instructor-select" name="radio" type="radio" onClick={() => {this.setRole('Instructor')}} />
            <p className="role-input-p">An Instructor</p>
          </div>
          <div className="role-choice">
            <input className="student-select" name="radio" type="radio" onClick={() => {this.setRole('Student')}}/>
            <p className="role-input-p">A Student</p>
          </div>
        </div>
        <button className='login-button' onClick={this.checkPassword}>
          Register
        </button> 
      </form>
    )
  }
}

export default RegisterForm