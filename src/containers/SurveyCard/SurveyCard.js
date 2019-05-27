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

  prettyDate = (dateString) => {
    let date = new Date(dateString)
    date = date.toLocaleDateString()
    return date
  }

  render() {
    return(
      <div className='survey-card'>
        <article className='survey-card-name'>
          {this.props.surveyData.surveyName}
        </article>
        <article className='card-exp-date'>
          {this.prettyDate(this.props.surveyData.surveyExpiration)}
        </article>
      </div>
    )
  }
}

export default SurveyCard
