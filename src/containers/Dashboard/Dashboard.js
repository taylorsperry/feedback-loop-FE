import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Dashboard extends Component {
  render() {
    return(
      <div>
        <h2>Feedback Loop</h2>
        <h4>Welcome to your dashboard</h4>
        <NavLink to='/new-survey'> 
          <button className='create-new-survey-button'>Create New Survey</button>
        </NavLink>
      </div>
    )
  }
}

export default Dashboard