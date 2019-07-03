import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setCurrentCohort, setInstructorSurveys } from '../../actions'
import cogoToast from 'cogo-toast';
import shortid from 'shortid'
import Team from '../../components/Team/Team'

export class SurveyPreview extends Component {
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
}
