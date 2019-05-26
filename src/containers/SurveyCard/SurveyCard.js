import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
  }

  render() {
    return(
      <div className='survey-card'>
      {this.props.surveyData.surveyName}
      </div>
    )
  }
}

export default SurveyCard
