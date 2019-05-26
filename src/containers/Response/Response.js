import React, { Component } from 'react'
import ResponseCard from '../ResponseCard/ResponseCard'
export class Response extends Component {
  constructor(props) {
    super(props)
    this.state={
      // member: this.props.member,
      // questions: this.props.questions,
      // currStudent: this.props.currStudent,
      displayQuestions: false
    }
  }

  completeSurvey = () => {
    this.setState({
      displayQuestions: !this.state.displayQuestions
    })
  }

  renderQuestions = () => {
    return this.props.questions.map(question => {
      return <ResponseCard key={question.id} question={question} member={this.props.member} currStudent={this.props.currStuent} />
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
              onClick={this.completeSurvey} className='close-button'>
              Close Survey for {this.props.member.name}</button>}
        </div>
      </div>
    )
  }
}

export default Response