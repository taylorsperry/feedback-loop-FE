import React, { Component } from 'react'

export class ResponseCard extends Component {
  constructor() {
    super();
    this.state = {
      response: {}
    }
  }
  
  handleChange = (e) => {
    this.setState({
      response: {
        question: this.props.question.id,
        currStudent: this.props.currStudent,
        member: this.props.member.id, 
        pointValue: parseInt(e.target.value)
      }
    }, () => {this.props.checkResponse(this.state.response)})
  }

  render() {
    return (
      <form className='response-card'>
        <p className='question-title'>{this.props.question.questionTitle}</p>
        <div className='response-container'>
          <div className='response-option'>
            <input 
              type="radio" 
              name="option" 
              value={this.props.question.options[0].pointValue}
              onChange={this.handleChange}
            />
            <p className='response-description'>{this.props.question.options[0].description}</p>
          </div>
          <div className='response-option'>
            <input 
              type="radio" 
              name="option"
              value={this.props.question.options[1].pointValue}
              onChange={this.handleChange}
            />
            <p className='response-description'>{this.props.question.options[1].description}</p>
          </div>
          <div className='response-option'>
            <input 
              type="radio" 
              name="option"
              value={this.props.question.options[2].pointValue}
              onChange={this.handleChange}
            />
            <p className='response-description'>{this.props.question.options[2].description}</p>
          </div>
          <div className='response-option'>
            <input 
              type="radio" 
              name="option"
              value={this.props.question.options[3].pointValue}
              onChange={this.handleChange}
            />
            <p className='response-description'>{this.props.question.options[3].description}</p>
          </div>
        </div>
      </form>
    )
  }
}

export default ResponseCard