import React, { Component } from 'react'
import Header from '../../components/Header/Header'

export class NewSurvey extends Component {
  constructor() {
    super();
    this.state = {
      surveyName: '',
      surveyExpiration: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    e.preventDefault()
  }

  render() {
    return(
      <div>
        <Header />
        <form onSubmit={this.handleSubmit} className='new-survey-landing-form'>
          <label className="begin-create-survey-label">
            Survey Name:
            <input 
              type="text"
              name="surveyName"
              value={this.state.surveyName}
              onChange={this.handleChange}
            />
          </label>
          <label className="begin-create-survey-label">
            Expiration Date:
          </label>
          <button className="begin-new-survey-button">ok</button>
        </form>
      </div>
    )
  }
}