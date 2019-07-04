import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setOwners } from '../../actions'

export class InstructorNametag extends Component {
  constructor() {
    super()
    this.state = {
      selected: false
    }
  }

  handleSelect = (e) => {
    e.preventDefault()
    let newOwners = this.props.owners

    this.props.owners.includes(this.props.instructor.id) ?
    newOwners = this.props.owners.filter(owner => owner !== this.props.instructor.id) :
    newOwners.push(this.props.instructor.id)

    this.props.setOwners(newOwners)
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    const backgroundColor = () => {
      return this.props.owners.includes(this.props.instructor.id) ? "#13F1FC" : "white"
    }

    return(
      <div className='instructor-nametag'
           clickable onClick={(e) => this.handleSelect(e)}
           style={{background: backgroundColor()}}>
        {this.props.instructor.name}
      </div>
    )
  }
}


InstructorNametag.propTypes = {
  cohorts: PropTypes.array,
  survey: PropTypes.object,
  currentCohort: PropTypes.array,
  user: PropTypes.string,
  instructorSurveys: PropTypes.array,
  handlePost: PropTypes.func,
  handleGet: PropTypes.func,
  setCurrentCohort: PropTypes.func,
  setInstructorSurveys: PropTypes.func,
  setOwners: PropTypes.func,
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
  setOwners: (owners) => dispatch(setOwners(owners))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorNametag)
