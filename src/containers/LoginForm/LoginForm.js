import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { setUser } from '../../actions'
// import RegisterForm from '../RegisterForm/RegisterForm'

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


  render() {
    return(
      <form className='login-form'>
        <div className='email'>
          <label for="email">Email</label>
          <input 
            type="email" 
            onChange={this.handleChange}  
            name="emailInput"
            className="login-input"
          />
        </div>
        <div className='password'>
          <label for="password">Password</label>
          <input 
            type="password" 
            onChange={this.handleChange}  
            name="passwordInput"
            className="login-input"
          />
        </div>
      </form>
    )
  }
}

// export const mapDispatchToProps = (dispatch) => ({
//   setUser: (user) => dispatch(setUser(user))
// })

export default LoginForm