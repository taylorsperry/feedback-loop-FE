import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { setStudentSurveys } from '../../actions/'

export class StudentDashboard extends Component {
  

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${this.props.user}`
    const surveys = await this.props.handleGet(url)
    this.props.setStudentSurveys(surveys)
  }

  renderSurvey = (survey) => {
    this.props.history.push(`/student-survey/${survey.surveyName}`)
    return <StudentSurvey key={survey.id}/>
  }
 
  render() {
    let surveyButtons
    if (this.props.studentSurveys) {
      surveyButtons = this.props.studentSurveys.map(survey => {
        return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
      })
    }
    
    return(
      <div className='dashboard-container'>
        Student Dashboard
        {surveyButtons}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  studentSurveys: state.studentSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
