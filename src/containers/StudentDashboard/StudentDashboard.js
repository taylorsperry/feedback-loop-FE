import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

export class StudentDashboard extends Component {
  constructor() {
    super(); 
    this.state = {
      fakeSurveys: [{survey_name: 'Week 4 Survey'}, {survey_name: 'Week 5 Survey'}]
    }
  }

  //on CDM, GET surveys assigned to current user
  //response will be an array
  //for each element in the array, setState with a key of that survey name and a value of the survey info

  componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.user.api_key}`
    const surveys = await this.props.handleGet(url)
  }
  
  //return a NavLink button with the survey_name, NavLink should go to StudentSurvey  
  render() {
    return(
      <div className='dashboard-container'>
        Student Dashboard
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url))
})

export default connect(mapStateToProps)(StudentDashboard)