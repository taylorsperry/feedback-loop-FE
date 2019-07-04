import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setOwners } from '../../actions'

export class InstructorNametag extends Component {
  componentDidMount = async function () {
    if this.props.instructor.id === this.props.user.id {
      const newOwners = this.props.owners
      newOwners.push(this.props.instructor.id)
      this.setOwners(newOwners)
    }
  }

  handleSelect = (e) => {
    e.preventDefault()
    let newOwners = this.props.owners

    this.props.owners.includes(this.props.instructor.id) ?
    newOwners = this.props.owners.filter(owner => owner.id !=== this.props.instructor.id) :
    newOwners.push(this.props.instructor.id)

    this.setOwners(newOwners)
  }

  render() {
    const backgroundColor = () => {
      this.props.owners.includes(this.props.instructor.id) ? "$main-blue-hover" : "white"
    }

    return(
      <div className='instructor-nametag'
           clickable onClick={(e) => this.handleSelect(e)}
           style=`background-color:${backgroundColor()}`>
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
  handleGet: (url) => dispatch(handleGet(url)),
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  setCurrentCohort: (cohort) => dispatch(setCurrentCohort(cohort)),
  setInstructorSurveys: (surveys) => dispatch(setInstructorSurveys(surveys)),
  setOwners: (owners) => dispatch(setOwners(owners))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorNametag)
