import React, { Component } from 'react'
import ResponseCard from '../ResponseCard/ResponseCard'
export class Response extends Component {
  constructor(props) {
    super(props)
    this.state={
      responses: [],
      displayQuestions: false
    }
  }

  completeSurvey = () => {
    this.setState({
      displayQuestions: !this.state.displayQuestions
    })
  }

  renderQuestions = () => {
    //not passing down currStudent to ResponseCard
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
    this.props.collectResponses(this.state.responses)
    this.setState({
      displayQuestions: !this.state.displayQuestions
    })
  }

  render() {
    return (
      <div className='member-survey'>
        <button onClick={this.completeSurvey} className=
        'response-button'>
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