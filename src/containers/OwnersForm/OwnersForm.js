import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setCurrentCohort, setInstructorSurveys } from '../../actions'
import cogoToast from 'cogo-toast';
import shortid from 'shortid'
import Team from '../../components/Team/Team'

export class OwnersForm extends Component {
  constructor() {
    super()
    this.state = {
      draggedStudent: {},
      group: [],
      teams: [{id: shortid(), name: '', members: []}]
    }
  }
}

render() {
  return(

  )
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
