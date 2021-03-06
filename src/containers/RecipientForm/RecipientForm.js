import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setCurrentCohort, setInstructorSurveys } from '../../actions'
import cogoToast from 'cogo-toast';
import shortid from 'shortid'
import Team from '../../components/Team/Team'

export class RecipientForm extends Component {
  constructor() {
    super()
    this.state = {
      cohort_id: 0,
      program: 'both',
      draggedStudent: {},
      group: [],
      teams: [{id: shortid(), name: '', members: []}]
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

  rejectSelectedStudents = (cohort) => {
    if (cohort) {
      let selectedStudents = []
      for(let i = 0; i < this.state.teams.length; i++) {
        for(let k = 0; k < this.state.teams[i].members.length; k++) {
          selectedStudents.push(this.state.teams[i].members[k].id)
        }
      }
      return cohort.filter((student => !selectedStudents.includes(student.id)))
    } else {
      return cohort
    }
  }

  handleAssignGroups = async () => {
    const { cohort_id, program } = this.state
    let url
    this.state.program === "both"
    ? url = `https://turing-feedback-api.herokuapp.com/api/v1/students?cohort=${cohort_id}`
    : url = `https://turing-feedback-api.herokuapp.com/api/v1/students?cohort=${cohort_id}&&program=${program}`
    let cohort = await this.props.handleGet(url)
    cohort = this.rejectSelectedStudents(cohort)
    await this.props.setCurrentCohort(cohort)
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
    const { draggedStudent } = this.state
    let leftoverStudents = this.props.currentCohort
    const teams = this.state.teams.map(team => {
      if(team.id === e.target.id) {
        const arr = team.members
        arr.push(draggedStudent)
        team.members = arr
        leftoverStudents = this.props.currentCohort.filter(student => {
          return student.id !== draggedStudent.id
        })
        return team
      } else {
        return team
      }
    })
    this.setState({
      teams: teams
    })
    this.props.setCurrentCohort(leftoverStudents)
  }

  addTeam = () => {
    this.setState({
      teams: [...this.state.teams, {id: shortid(), members: []}]
    })
  }

  handleTeamName = (teamId, teamName) => {
    const updatedTeams = this.state.teams.map(team => {
      if(team.id === teamId) {
        team.name = teamName
        return team
      } else {
        return team
      }
    })
    this.setState({
      teams: updatedTeams
    })
  }

  checkSurvey = () => {
    this.checkTeamNames()
  }

  checkTeamNames = () => {
    const names = this.state.teams.filter(team => {
      if (team.name !== '') {
        return team.name
      }
    })
    if(names.length < this.state.teams.length) {
      this.sendToast('Each team must have a name')
    } else {
      this.checkGroups()
    }
  }

  checkGroups = () => {
    const formattedGroups = this.state.teams.map(team => {
      const formattedMembers = team.members.map(member => {
        return member.id
      })
      if (formattedMembers.length < 2) {
        this.sendToast('There must be at least two students in a group')
      } else {
        const formattedGroup = {
          name: team.name,
          members_ids: formattedMembers
        }
        return formattedGroup
      }
    })
    this.postSurvey(formattedGroups)
  }

  postSurvey = async (formattedGroups) => {
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
              groups: formattedGroups
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

    const teams = this.state.teams.map(team => {
      return <Team key={team.id} id={team.id} members={team.members} handleTeamName={this.handleTeamName}/>
    })

    return(
      <div className="recipient-wrapper">
        {/* top section */}
        <div className="recipients-form">
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

        {/* middle section */}
        <div className="student-groups-wrapper">
          <div className="assigned-students">
            <div className='teams-container'
                  onDrop={e => this.onDrop(e)}
                  onDragOver={(e => this.onDragOver(e))}>
              {teams}
            </div>
            <div className='team-button-container'>
              <button onClick={this.addTeam} className='team-button'>Add a New Team</button>
            </div>
          </div>
          <div className="available-students">
            {studentsToDisplay}
          </div>
        </div>

        {/* bottom button */}
        <div className='send-button-container'>
          <button className="send-button"
                  onClick={this.checkSurvey}>Send Survey</button>
        </div>
      </div>
    )
  }
}

RecipientForm.propTypes = {
  cohorts: PropTypes.array,
  survey: PropTypes.object,
  currentCohort: PropTypes.array,
  user: PropTypes.string,
  instructorSurveys: PropTypes.array,
  handlePost: PropTypes.func,
  handleGet: PropTypes.func,
  setCurrentCohort: PropTypes.func,
  setInstructorSurveys: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  survey: state.survey,
  cohorts: state.cohorts,
  currentCohort: state.currentCohort,
  user: state.user,
  instructorSurveys: state.instructorSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort)),
  setInstructorSurveys: (surveys) => dispatch(setInstructorSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm)