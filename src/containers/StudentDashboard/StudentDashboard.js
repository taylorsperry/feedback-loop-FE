import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { NavLink } from 'react-router-dom'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { setStudentSurveys } from '../../actions/'

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
    const surveys = this.state.fakeSurveys
    this.props.setStudentSurveys(surveys)
  }
  
  listSurveys = () => {
    const surveys = this.state.fakeSurveys
    return surveys.map(survey => {
      return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.survey_name}</button>  
    })
  }

  renderSurvey = (survey) => {
    this.props.history.push(`/student-survey/${survey.survey_name}`)
    return <StudentSurvey />
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
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)