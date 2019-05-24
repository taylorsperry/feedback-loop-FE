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


  render() {
    return(
      <form className='login-form'>
        <div className='full-name'>
          <label for="full-name">Enter Your First and Last Name</label>
          <input 
            type="text" 
            onChange={this.handleChange}  
            name="full_name"
            className="login-input"
          />
        </div>
        <div className='email'>
          <label for="email">Email</label>
          <input 
            type="email" 
            onChange={this.handleChange}  
            name="email"
            className="login-input"
          />
        </div>
        <div className='password'>
          <label for="password">Password</label>
          <input 
            type="password" 
            onChange={this.handleChange}  
            name="password_1"
            className="login-input"
          />
        </div>
        <div className='password'>
          <label for="password">Confirm Password</label>
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
            <input type="radio" />
            <p className="role-input-p">An Instructor</p>
          </div>
          <div className="role-choice">
            <input type="radio" />
            <p className="role-input-p">A Student</p>
          </div>
        </div>
      </form>
    )
  }
}

export default RegisterForm