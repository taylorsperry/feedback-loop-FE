import React, { Component } from 'react'
import ResponseCard from '../ResponseCard/ResponseCard'
export class Response extends Component {
  constructor(props) {
    super(props)
    this.state={
      // member: this.props.member,
      // questions: this.props.questions,
      // currStudent: this.props.currStudent,
    }
  }

  componentDidMount() {
    // console.log(this.props)
  } 

  renderQuestions = () => {
    return this.props.questions.map(question => {
      return <ResponseCard key={question.id} question={question} member={this.props.member} currStudent={this.props.currStuent} />
    })
  }

  render() {
    return (
      <div className='member-survey'>
        <p>Give {this.props.member.name} Feedback</p>
        {this.props.questions && this.renderQuestions()}
      </div>
    )
  }
}

export default Response