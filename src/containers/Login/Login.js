import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../../actions'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
        cohort: '1811',
        id: 3,
        name: 'Jessica Hansen',
        program: 'F',
        status: 'active'
    }
  }

  handleLogin = () => {
    this.props.setUser(this.state)
  }

  render() {
    return(
      <div className='login-container'>
        <NavLink to='/dashboard'>
          <button className='login-button' onClick={this.handleLogin}>
          Login
          </button>
        </NavLink>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
})

export default connect(null, mapDispatchToProps)(Login)