import React, { Component } from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../../components/Header/Header';
import Question from '../../components/Question/Question'
import shortid from 'shortid'
import { setSurvey } from '../../actions'


export class NewSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyName: '',
      surveyExpiration: new Date(),
      newQuestion: false,
      questions: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.setSurvey(this.state)
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

  addQuestion = () => {
    this.setState({
      questions: [...this.state.questions, <Question key={shortid()} />]
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
        <button className="begin-new-survey-button" type="submit">ok</button>
        </form>
        {this.state.questions}
        <button className="begin-new-survey-button" onClick={this.addQuestion}>Add a Question</button>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setSurvey: (survey) => dispatch(setSurvey(survey))
})

export default connect(null, mapDispatchToProps)(NewSurvey)