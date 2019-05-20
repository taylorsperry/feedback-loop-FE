import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../../components/Header/Header'


export class NewSurvey extends Component {
  constructor() {
    super();
    this.state = {
      surveyName: '',
      surveyExpiration: new Date()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
    const { name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleDate = (date) => {
    console.log(date)
    this.setState({
      surveyExpiration: date
    })
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
            <DatePicker 
              selected={this.state.surveyExpiration}
              onChange={this.handleDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
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