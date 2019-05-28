import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setCurrentCohort } from '../../actions'
// import plusbutton from '../../assets/plusbutton.png'
// import shortid from 'shortid'

export class Group extends Component {
  constructor() {
    super()
    this.state = {
      group: [],
      draggedStudent: {}
      // displayTeams: "none"
    }
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

  // handleNewGroup = (group) => {
  //   console.log("Let's make another group")
  //     this.setState({
  //       groups: [...this.props.groups, this.state]
  //     })
  // }

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

     const groupToDisplay = this.state.group.map(student => {
      return <div key={student.id} id={student.id} className="student-nametag">{student.name}</div>
    })

    return(
      <div className="student-groups-wrapper"
      style={{display: 'flex'}}>>
        <div className="groups-wrapper"
          onDrop={e => this.onDrop(e)}
          onDragOver={(e => this.onDragOver(e))}>
          <section>
            <h3>A New Group</h3>
            <div className="groups">
              {groupToDisplay}
            </div>
          </section>
        </div>
        <section className="students-display">{studentsToDisplay}
        </section>
      </div>
    )
  }

  //this is where we will need to handle individual students being dragged into a group
  //once the group is formed we will pass that group up to RecipientForm
  //we will spread in anything in "groups in state" and add this new group
  //I think all of the drag and drop will need to be moved here 😬

}

export const mapStateToProps = (state) => ({
  currentCohort: state.currentCohort
})

export const mapDispatchToProps = (dispatch) => ({
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort))
})

export default connect(mapStateToProps, mapDispatchToProps)(Group)