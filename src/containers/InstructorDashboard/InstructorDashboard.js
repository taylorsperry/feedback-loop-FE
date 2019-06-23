import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import { Link } from "react-router-dom";
import SurveyCard from '../SurveyCard/SurveyCard'
import { setInstructorSurveys } from '../../actions'
import PropTypes from 'prop-types'

export class InstructorDashboard extends Component {

  async componentDidMount() {
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys?api_key=${myKey}`
    const surveys = await this.props.handleGet(url)
    this.props.setInstructorSurveys(surveys)
  }

  render() {
    return(
      <div className='surveys-accordion'>
        <h2 className='inst-dashboard-header'>My Dashboard</h2>
        <div className='inst-surveys'>
          {this.props.instructorSurveys && this.props.instructorSurveys.map(survey => {
            return <SurveyCard key={survey.id}
                               surveyData={survey}/>
          })}
        </div>
        <Link to='/new-survey'>
          <button className='create-new-survey-button'>Create New Survey</button>
        </Link>
      </div>
    )
  }
}

InstructorDashboard.propTypes = {
  user: PropTypes.string,
  instructorSurveys: PropTypes.array,
  handleGet: PropTypes.func,
  setInstructorSurveys: PropTypes.func
}

export const mapStateToProps = (state) => ({
  user: state.user,
  instructorSurveys: state.instructorSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setInstructorSurveys: (surveys) => dispatch(setInstructorSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard)