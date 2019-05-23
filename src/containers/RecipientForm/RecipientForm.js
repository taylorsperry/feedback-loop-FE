import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'

export class RecipientForm extends Component {
  constructor() {
    super()
    this.state = {
      cohort_id: 0
    }
  }

  handleChange = (e) => {
    const cohortId = parseInt(e.target.value)
    this.setState({
      cohort_id: cohortId
    })
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
    console.log(options)
    this.props.handlePost(url, options)
  }

  render() {
    const cohortList = this.props.cohorts.map(cohort => {
      return <option key={cohort.id} value={cohort.id} >{cohort.name}</option>
    })
    return(
      <div>
        <div>
          <h2>Select Recipients</h2>
          <h3>Program</h3>
          <select>
            <option>BE</option>
            <option>FE</option>
          </select>
          <h3>Cohort</h3>
          <select onChange={this.handleChange} >
            <option value="0">select a cohort</option>
            {cohortList}
          </select>
          <button disabled={!this.state.cohort_id} onClick={this.postSurvey}>Send</button>
        </div>
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
  cohorts: state.cohorts
})

export const mapDispatchToProps = (dispatch) => ({
  handlePost: (url, options) => dispatch(handlePost(url, options)) 
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipientForm)