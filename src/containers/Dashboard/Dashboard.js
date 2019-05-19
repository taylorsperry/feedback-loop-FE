import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Dashboard extends Component {
  render() {
    return(
      <div>
        <h2>
          Dashboard
        </h2>
        <NavLink to='/new-survey' className='login-button'> 
          <button>Create New Survey</button>
        </NavLink>
      </div>
    )
  }
}

export default Dashboard