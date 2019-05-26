import React, { Component } from 'react'

export class ResponseCard extends Component {
  constructor(props) {
    super(props)
    this.state={
      member: this.props.member,
      questions: this.props.questions,
      currStudent: this.props.currStudent,
    }
  }

  componentDidMount() {
    console.log(this.props)
  } 

  render() {
    return (
      <div className='member-survey'>
        <p>Give {this.state.member.name} Feedback</p>
      </div>
    )
  }
}

export default ResponseCard