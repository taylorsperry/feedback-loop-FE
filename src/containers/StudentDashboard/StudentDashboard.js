import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleGet } from '../../thunks/handleGet'

export class StudentDashboard extends Component {
  constructor() {
    super(); 
    this.state = {
      fakeSurveys: [{survey_name: 'Week 4 Survey', id: 4, questions: ['one', 'two']}, {survey_name: 'Week 5 Survey', id: 5, questions: ['three', 'four']}]
    }
  }

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.user.api_key}`
    // const surveys = await this.props.handleGet(url)
    // // const surveys = this.state.fakeSurveys
    // this.setState({
    //   surveys: surveys
    // })
  }
  
  listSurveys = () => {
    const surveys = this.state.fakeSurveys
    return surveys.map(survey => {
      return <NavLink to="/student-survey" key={survey.id}> 
                <button>{survey.survey_name}</button>
              </NavLink>
    })
  }
 
  render() {
    return(
      <div className='dashboard-container'>
        Student Dashboard
        {this.listSurveys()}
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)