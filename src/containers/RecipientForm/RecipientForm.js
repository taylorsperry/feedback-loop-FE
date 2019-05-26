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
      program: 'b',
      draggedStudent: {},
      group: []
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
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/students?cohort=${cohort_id}&&program=${program}`
    const response = await fetch(url)
    const cohort = await response.json()
    await this.props.setCurrentCohort(cohort)
  }

  postSurvey = () => {
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
          <h3 className="student-selector">Program</h3>
          <select className="drop-down" onChange={this.handleProgram}>
            <option value="b" >BE</option>
            <option value="f" >FE</option>
          </select>
          <h3 className="student-selector">Cohort</h3>
          <select className="drop-down" onChange={this.handleCohort} >
            <option value="0">select a cohort</option>
            {cohortList}
          </select>
          <button className="recipients-button" onClick={this.handleAssignGroups}>Assign Groups</button>
        </div>
        <div className="students-display">{studentsToDisplay}</div>
        <div className="groups-wrapper" onDrop={e => this.onDrop(e)}  onDragOver={(e => this.onDragOver(e))}><div>Drag Names Here to Make a Group{groupToDisplay}</div></div>
        <button className="recipients-button" disabled={!this.state.cohort_id} onClick={this.postSurvey}>Send</button>
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