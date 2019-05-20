import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Header/Header'

export class Dashboard extends Component {
  render() {
    return(
      <div>
        <Header />
        <NavLink to='/new-survey'> 
          <button className='create-new-survey-button'>Create New Survey</button>
        </NavLink>
      </div>
    )
  }
}

export default Dashboard