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

  componentDidMount() {
    // console.log(this.props)
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
        <p onClick={this.completeSurvey}>
          Give {this.props.member.name} Feedback
        </p>
        {this.state.displayQuestions && this.renderQuestions()}
        {this.state.displayQuestions && <button onClick={this.completeSurvey}>Close Survey for {this.props.member.name}</button>}
      </div>
    )
  }
}

export default Response