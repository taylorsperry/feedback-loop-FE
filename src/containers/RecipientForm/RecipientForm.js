import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { setCurrentCohort } from '../../actions'
import cogoToast from 'cogo-toast';

export class RecipientForm extends Component {
  constructor() {
    super()
    this.state = {
      cohort_id: 0,
      program: 'both',
      draggedStudent: {},
      group: [],
      displayTeams: "none"
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
    let url
    this.state.program === "both"
    ? url = `https://turing-feedback-api.herokuapp.com/api/v1/students?cohort=${cohort_id}`
    : url = `https://turing-feedback-api.herokuapp.com/api/v1/students?cohort=${cohort_id}&&program=${program}`
    const response = await fetch(url)
    const cohort = await response.json()
    await this.props.setCurrentCohort(cohort)
    this.setState({
      displayTeams: "flex"
    })
  }

  postSurvey = () => {
    if(this.state.group.length < 2) {
      this.sendToast('There must be at least two students in a group')
    } else {
      const membersIds = []
      this.state.group.forEach(student => {
        membersIds.push(student.id)
      })
      const { cohort_id } = this.state
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
                groups: [{name: cohort_id, members_ids: membersIds}]
              }
          }),
          headers: {
            'Content-Type': 'application/json'
          }
      }
      this.props.handlePost(url, options)
      this.handleSuccess()
    }
  }

  handleSuccess = () => {
    cogoToast.success('Your survey has been sent', {position: 'bottom-left'})
    this.props.history.push('/dashboard')
  }

  sendToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  onDrag = (e, student) => {
    e.preventDefault()
    this.setState({
      draggedStudent: {id: student.id, name: student.name}
    })
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e) => {
    e.preventDefault()
    const { group, draggedStudent } = this.state
    this.setState({
      group: [...group, draggedStudent ],
      draggedStudent: {}
    })
    const leftoverStudents = this.props.currentCohort.filter(student => {
      return student.id !== draggedStudent.id
    })
    this.props.setCurrentCohort(leftoverStudents)
  }

  render() {
    const studentsToDisplay = this.props.currentCohort.map(student => {
      return <div
              key={student.id}
              id={student.id}
              className="student-nametag"
              draggable onDrag={(e) => this.onDrag(e, student)}>
              {student.name}
             </div>
    })
    const cohortList = this.props.cohorts.map(cohort => {
      return <option key={cohort.id} value={cohort.name} name="cohort_id" >{cohort.name}</option>
    })
    const groupToDisplay = this.state.group.map(student => {
      return <div key={student.id} id={student.id} className="student-nametag">{student.name}</div>
    })
    return(
      <div className="recipient-controls-wrapper">
        <div className="recipients-form-wrapper">
          <h2 className="recipients-form-title">Select Recipients</h2>
          <div className="student-selector-wrapper">
            <select className="drop-down" onChange={this.handleCohort} >
            <option value="0">Select a cohort</option>
            {cohortList}
            </select>
            <select className="drop-down" onChange={this.handleProgram}>
              <option>Select a program</option>
              <option value="b" >BE</option>
              <option value="f" >FE</option>
              <option value="both" >Both</option>
            </select>
            <button className="recipients-button" onClick={this.handleAssignGroups}>Populate Students</button>
          </div>
        </div>
        <div className="student-groups-wrapper"
             style={{display: this.state.displayTeams}}>
          <div className="groups-wrapper"
                onDrop={e => this.onDrop(e)}
                onDragOver={(e => this.onDragOver(e))}>
            <div className="groups-title">Drag Names Here to Form Groups
            </div>
            <div className="groups">
              {groupToDisplay}
            </div>
          </div>
          <div className="students-display">{studentsToDisplay}
          </div>
        </div>
        <button className="recipients-button"
                onClick={this.postSurvey}
                style={{display: this.state.displayTeams}}>Send Survey
        </button>
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
  currentCohort: state.currentCohort,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm)
