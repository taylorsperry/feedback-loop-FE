import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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

  render() {
    const cohortList = this.props.cohorts.map(cohort => {
      return <option key={cohort.id} value={cohort.id} >{cohort.name}</option>
    })
    return(
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
        <button disabled={!this.state.cohort_id}>Send</button>
      </div>
    )
  }
}

RecipientForm.propTypes = {
  cohorts: PropTypes.array
}

export const mapStateToProps = (state) => ({
  cohorts: state.cohorts
})

export default connect(mapStateToProps)(RecipientForm)