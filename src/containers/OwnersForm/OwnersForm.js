import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setCurrentCohort, setInstructorSurveys, setSurveyTeams } from '../../actions'
import cogoToast from 'cogo-toast';
import shortid from 'shortid'
import Team from '../../components/Team/Team'

export class OwnersForm extends Component {
  constructor() {
    super()
    this.state = {
      owners: [],
      instructors: []
    }
  }

  componentDidMount = async function () {
    let url = `https://turing-feedback-api.herokuapp.com/api/v1/students`
    let instructors = await this.props.handleGet(url)
    await this.setState({
      instructors: instructors
    })
  }

  handleSelect = (e, instructor) => {
    e.preventDefault()
    const selectedInstructor = { id: instructor.id, name: instructor.name }
    const newOwners = this.state.owners
    newOwners.push(selectedInstructor)
    this.setState({
      owners: newOwners
    })
  }

  checkOwners = () => {
    if (this.state.owners.length === 0) {
      this.sendToast('You must assign at least one owner for this survey')
    } else {
      this.postSurvey()
    }
  }

  postSurvey = async () => {
    const { survey } = this.props
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/surveys"
    const options = {
        method: 'POST',
        body: JSON.stringify({
          api_key: this.props.user,
          survey:
            {
              surveyName: survey.surveyName,
              surveyExpiration: survey.surveyExpiration,
              questions: survey.questions,
              groups: this.props.surveyTeams,
              owners: this.state.owners
            }
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
    await this.props.handlePost(url, options)
    this.handleSuccess()
  }


  handleSuccess = async () => {
    cogoToast.success('Your survey has been sent', {position: 'bottom-left'})
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys?api_key=${myKey}`
    const surveys = await this.props.handleGet(url)
    await this.props.setInstructorSurveys(surveys)
    this.props.history.push('/dashboard')
  }

  sendToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  render() {
    const instructorsToDisplay = this.state.instructors.map(instructor => {
      return <div
              key={instructor.id}
              id={instructor.id}
              className="instructor-nametag"
              clickable onClick={(e) => this.handleSelect(e, instructor)}>
              {instructor.name}
             </div>
    })

    return(
      <div className="owners-wrapper">
        <div className='owners-title'>
          Select Survey Owners
        </div>
        <div className='owners-list'>
          {instructorsToDisplay}
        </div>
        <div className='submit-button-container'>
          <button className="submit-button"
                  onClick={this.checkOwners}>Send Survey</button>
        </div>
      </div>
    )
  }
}


OwnersForm.propTypes = {
  cohorts: PropTypes.array,
  survey: PropTypes.object,
  currentCohort: PropTypes.array,
  user: PropTypes.string,
  instructorSurveys: PropTypes.array,
  handlePost: PropTypes.func,
  handleGet: PropTypes.func,
  setCurrentCohort: PropTypes.func,
  setInstructorSurveys: PropTypes.func,
  owners: PropTypes.array
}

export const mapStateToProps = (state) => ({
  survey: state.survey,
  cohorts: state.cohorts,
  currentCohort: state.currentCohort,
  user: state.user,
  instructorSurveys: state.instructorSurveys,
  owners: state.owners
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort)),
  setInstructorSurveys: (surveys) => dispatch(setInstructorSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(OwnersForm)
