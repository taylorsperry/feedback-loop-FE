import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { Link } from "react-router-dom";
import { setStudentSurveys } from '../../actions/'
import SurveyCard from '../SurveyCard/SurveyCard'
import OpenSurveys from '../../utils/sampleSurveys.js'
import ClosedSurveys from '../../utils/closedSampleSurveys.js'

export class InstructorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      surveys: null
    }
  }

  async componentDidMount() {
    const myKey = await this.props.user
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys?api_key=${myKey}`
    const surveys = await this.props.handleGet(url)
    this.setState({
      surveys: surveys
    })
  }

  render() {
    return(
      <div className='surveys-accordion'>
        <Link to='/new-survey'>
        <button className='create-new-survey-button'>Create New Survey</button>
        </Link>
        <div className='inst-surveys'>
          {this.state.surveys && this.state.surveys.map(survey => {
            return <SurveyCard key={survey.id}
                               surveyData={survey}/>
          })}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard)
