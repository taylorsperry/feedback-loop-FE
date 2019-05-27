import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

export class SurveyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDisplay: "none"
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
  }

  toggleData = () => {
    let display
    this.state.dataDisplay == "none"
    ? display = "flex"
    : display = "none"

    this.setState({
      dataDisplay: display
    })
  }

  prettyDate = (dateString) => {
    let date = new Date(dateString)
    date = date.toLocaleDateString()
    return date
  }

  render() {
    return(
      <section className='survey-accordion'>
        <div className='survey-card'
             onClick={this.toggleData}>
          <article className='survey-card-name'>
            {this.props.surveyData.surveyName}
          </article>
          <article className='card-exp-date'>
            {this.prettyDate(this.props.surveyData.surveyExpiration)}
          </article>
        </div>
        <div className='survey-data'
             style={{display: this.state.dataDisplay}}>
          BUTTS
        </div>
      </section>
    )
  }
}

export default SurveyCard
