import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import StudentResult from '../StudentResult/StudentResult'
import { setStudentSurveys, setClosedSurveys, setMySurvey } from '../../actions/'
import PropTypes from 'prop-types'

export class StudentDashboard extends Component {

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${localStorage.getItem('currentUser')}`
    const closedUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/closed?api_key=${localStorage.getItem('currentUser')}`
    const surveys = await this.props.handleGet(url)
    const closedSurveys = await this.props.handleGet(closedUrl)
    this.props.setStudentSurveys(surveys)
    this.props.setClosedSurveys(closedSurveys)
  }

  renderSurvey = async (survey) => {
    await this.props.setMySurvey(survey)
    await this.props.history.push(`/student-survey/${survey.id}`)
    return await <StudentSurvey key={survey.id}/>
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
  setStudentSurveys: PropTypes.func,
  setMySurvey: PropTypes.func,
  mySurvey: PropTypes.object
}

export const mapStateToProps = (state) => ({
  user: state.user,
  studentSurveys: state.studentSurveys,
  closedSurveys: state.closedSurveys,
  mySurvey: state.mySurvey
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys)),
  setClosedSurveys: (closedSurveys) => dispatch(setClosedSurveys(closedSurveys)),
  setMySurvey: (survey) => dispatch(setMySurvey(survey))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
