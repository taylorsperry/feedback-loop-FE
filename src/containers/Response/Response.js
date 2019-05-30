import React, { Component } from 'react'
import ResponseCard from '../ResponseCard/ResponseCard'
import cogoToast from 'cogo-toast'

export class Response extends Component {
  constructor(props) {
    super(props)
    this.state={
      responses: [],
      displayQuestions: false,
      saveResponses: false,
    }
  }

  completeSurvey = () => {
    this.setState({
      displayQuestions: true
    })
  }

  renderQuestions = () => {
    return this.props.questions.map(question => {
      return <ResponseCard key={question.id} question={question} member={this.props.member} checkResponse={this.checkResponse} />
    })
  }

  checkResponse = (newResponse) => {
    const newResponseId = newResponse.question
    if (this.state.responses.length >= 1) {
      const questionIds = this.state.responses.map(stateResponse => {
        return stateResponse.question
      })
      if(!questionIds.includes(newResponseId)) {
        this.addResponse(newResponse)
      } else {
        this.updateResponse(newResponse)
      }
    } else {
      this.setState({
        responses: [newResponse]
      })
    }
  }

  addResponse = (newResponse) => {
    this.setState({
      responses: [...this.state.responses, newResponse]
    })
  }

  updateResponse = (newResponse) => {
    const stateResponses = this.state.responses
    const updatedResponses = stateResponses.map(stateResponse => {
      if(stateResponse.question === newResponse.question) {
        stateResponse = newResponse
      }
      return stateResponse
    })
    this.setState({
      responses: updatedResponses
    })
  }

  closeResponse = () => {
    if (this.state.responses.length < this.props.questions.length) {
      this.warnToast('Please answer each question before saving feedback')
    } else {
      this.props.collectResponses(this.state.responses)
      this.setState({
        displayQuestions: false,
        saveResponses: true
      })
    }
  }

  warnToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  render() {
    return (
      <div className='member-survey'>
        <button onClick={this.completeSurvey} className=
        'member-button' disabled={this.state.saveResponses}>
          Give {this.props.member.name} Feedback
        </button>
        {this.state.displayQuestions && this.renderQuestions()}
        <div className='close-button-container'>
          {this.state.displayQuestions && 
            <button 
              onClick={this.closeResponse} className='close-button'>
              Save Feedback for {this.props.member.name}
            </button>
          }
        </div>
      </div>
    )
  }
}

export default Response
