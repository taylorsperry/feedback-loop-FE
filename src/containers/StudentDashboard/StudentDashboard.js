import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import StudentResult from '../StudentResult/StudentResult'
import { setStudentSurveys } from '../../actions/'
import { setClosedSurveys } from '../../actions/'
import PropTypes from 'prop-types'
import Surveys from '../../utils/sampleSurveys'

export class StudentDashboard extends Component {

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${localStorage.getItem('currentUser')}`
    const closedUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/closed?api_key=${localStorage.getItem('currentUser')}`
    const surveys = await this.props.handleGet(url)
    const closedSurveys = await this.props.handleGet(closedUrl)
    if(surveys) {
      this.props.setStudentSurveys(surveys)
    }
    if(closedSurveys) {
      this.props.setClosedSurveys(closedSurveys)
    }
  }

  renderSurvey = (survey) => {
    this.props.history.push(`/student-survey/${survey.id}`)
    return <StudentSurvey key={survey.id} />
  }

  render() {
    let surveyButtons
    if (this.props.studentSurveys) {
      surveyButtons = this.props.studentSurveys.map(survey => {
        return <button className='student-pending-survey' key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
      })
    }

    if (this.props.studentSurveys.length === 0) {
      surveyButtons = <p className='no-student-surveys'>You're all caught up!</p>
    }

    return(
      <div className='dashboard-container'>
        <h1 className='student-dashboard-header'>My Dashboard</h1>
        <section className='student-survey-container'>
          <article className='student-surveys'>
            <h2 className='article-header'>Surveys</h2>
            <div className='article-container'>
              {surveyButtons}
            </div>
          </article>
          <article className='student-feedback'>
            <h2 className='article-header'>Feedback</h2>
            <div className='article-container'>
              {this.props.closedSurveys && this.props.closedSurveys.map(survey => {
                return <StudentResult 
                        key={survey.id}
                        survey={survey}
                        />
              })}
            </div>
          </article>
        </section>
      </div>
     )
  }
}

StudentDashboard.propTypes = {
  user: PropTypes.string,
  studentSurveys: PropTypes.array,
  handleGet: PropTypes.func,
  setStudentSurveys: PropTypes.func
}

export const mapStateToProps = (state) => ({
  user: state.user,
  studentSurveys: state.studentSurveys,
  closedSurveys: state.closedSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys)),
  setClosedSurveys: (closedSurveys) => dispatch(setClosedSurveys(closedSurveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
