import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { setCurrentCohort } from '../../actions'

export class RecipientForm extends Component {
  constructor() {
    super()
    this.state = {
      cohort_id: 0,
      program: 'b'
    }
  }

  handleProgram = (e) => {
    this.setState({
      program: e.target.value
    })
  }

  handleCohort = (e) => {
    this.setState({
      cohort_id: e.target.value
    })
  }

  handleAssignGroups = async () => {
    const { cohort_id, program } = this.state
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/users?cohort=${cohort_id}&&program=${program}`
    const response = await fetch(url)
    const cohort = await response.json()
    await this.props.setCurrentCohort(cohort)
  }

  postSurvey = () => {
    const { cohort_id } = this.state
    const { survey } = this.props
    const url = "https://turing-feedback-api.herokuapp.com/api/v1/surveys"
    const options = {
        method: 'POST',
        body: JSON.stringify({
          api_key: 'api_key from redux store',
          surveyName: survey.surveyName,
          surveyExpiration: survey.surveyExpiration,
          questions: survey.questions,
          groups: [{name: cohort_id}]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    }
    this.props.handlePost(url, options)
  }

  render() {
    const studentsToDisplay = this.props.currentCohort.map(student => {
      return <div key={student.id} className="student-nametag">{student.name}</div>
    })
    const cohortList = this.props.cohorts.map(cohort => {
      return <option key={cohort.id} value={cohort.name} name="cohort_id" >{cohort.name}</option>
    })
    return(
      <div>
        <div>
          <h2>Select Recipients</h2>
          <h3>Program</h3>
          <select onChange={this.handleProgram}>
            <option value="b" >BE</option>
            <option value="f" >FE</option>
          </select>
          <h3>Cohort</h3>
          <select onChange={this.handleCohort} >
            <option value="0">select a cohort</option>
            {cohortList}
          </select>
          <button onClick={this.handleAssignGroups}>Assign Groups</button>
          <button disabled={!this.state.cohort_id} onClick={this.postSurvey}>Send</button>
        </div>
        {studentsToDisplay}
      </div>
    )
  }
}

RecipientForm.propTypes = {
  cohorts: PropTypes.array,
  survey: PropTypes.object
}

export const mapStateToProps = (state) => ({
  survey: state.survey,
  cohorts: state.cohorts,
  currentCohort: state.currentCohort
})

export const mapDispatchToProps = (dispatch) => ({
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm)