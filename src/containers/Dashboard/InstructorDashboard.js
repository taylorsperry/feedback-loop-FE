import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { Link } from "react-router-dom";
import { setStudentSurveys } from '../../actions/'
import SurveyCard from '../SurveyCard/SurveyCard'
import OpenSurveys from './sampleSurveys.js'
import ClosedSurveys from './closedSampleSurveys.js'

export class InstructorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      fakeSurveys: OpenSurveys
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
  //
  // listSurveys = () => {
  //   const surveys = this.state.fakeSurveys
  //   return surveys.map(survey => {
  //     return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
  //   })
  // }
  //
  // closedSurveys = () => {
  //   return ClosedSurveys.map(survey => {
  //     return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
  //   })
  // }

  render() {
    const openSurveys = OpenSurveys.map(survey => {
      return <SurveyCard key={survey.id}
                         surveyData={survey}/>
    })
    return(
      <div className='surveys-accordion'>
        <Link to='/new-survey'>
        <button className='create-new-survey-button'>Create New Survey</button>
        </Link>
        <div className='inst-surveys'>
          {openSurveys}
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
