import React, { Component } from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import Question from '../../components/Question/Question'
import shortid from 'shortid'
import { setSurvey } from '../../actions'
import { withRouter } from 'react-router-dom'
import cogoToast from 'cogo-toast';

export class NewSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyName: '',
      surveyExpiration: new Date(),
      questions: [ { id: shortid()} ],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(!this.state.surveyName || !this.state.questions[0].questionTitle || !this.state.questions[0].options[0].option_1.description) {
      this.warnToast('Your survey must have a name and at least one question')
    } else {
      this.props.setSurvey(this.state)
      this.props.history.push('/recipients')
    }
  }

  warnToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  handleChange = (e) => {
    const { name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  handleDate = (date) => {
    this.setState({
      surveyExpiration: date
    })
  }

  updateQuestions = (newQuestion) => {
    if(this.state.questions.length) {
      const updatedQuestions = this.state.questions.map(question => {
        if (question.id === newQuestion.id) {
          question = newQuestion
        }
        return question
      })
      this.setState({
        questions: updatedQuestions
      })
    }
  }

  addQuestion = () => {
    this.setState({
      questions: [...this.state.questions, { id: shortid() }]
    })
  }

  displayQuestion = (question) => (
    <Question
      key={question.id}
      {...question}
      updateQuestions={this.updateQuestions} />
  )

  render() {

    let questionCards
    if (this.state.questions.length) {
      questionCards = this.state.questions.map(question => this.displayQuestion(question))
    }

    return(
      <div className='new-survey-container'>
        <form onSubmit={this.handleSubmit} className='new-survey-landing-form'>
          <input
            type="text"
            name="surveyName"
            className="survey-name"
            placeholder="Add Survey Name"
            value={this.state.surveyName}
            onChange={this.handleChange}
          />
          <label className="begin-create-survey-label">
            <p className="exp">Expiration Date:</p>
            <DatePicker
              selected={this.state.surveyExpiration}
              onChange={this.handleDate}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="Time"
              popperClassName="popper"
              />
          </label>
        </form>
        <div className='question-cards'>
          {questionCards}
        </div>
        <div className='controls'>
          <button className="begin-new-survey-button" onClick={this.addQuestion}>Add a Question</button>
          <button className="begin-new-survey-button" onClick={this.handleSubmit}>Choose Recipients</button>
        </div>
      </div>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setSurvey: (survey) => dispatch(setSurvey(survey))
})

export default withRouter(connect(null, mapDispatchToProps)(NewSurvey))
