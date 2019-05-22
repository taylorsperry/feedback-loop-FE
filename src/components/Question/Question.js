import React, { Component } from 'react'
import shortid from 'shortid'

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      questionTitle: '',
      option_1: {pointValue: 1, questionText: ''},
      option_2: {pointValue: 2, questionText: ''},
      option_3: {pointValue: 3, questionText: ''},
      option_4: {pointValue: 4, questionText: ''},
      option_5: {pointValue: 5, questionText: ''}
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
      this.setState({  [name] : {pointValue: this.state[name].pointValue, questionText: value} })
  }

  handleTitleChange = (e) => {
    this.setState({
      questionTitle: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateQuestions(this.state)
  }

  render() {
    return (
      <form onBlur={this.handleSubmit} className='question-form'>
        <div> 
          <input 
            type="text"
            name="questionTitle"
            className="question-input"
            placeholder="Untitled Question"
            value={this.state.questionTitle}
            onChange={this.handleTitleChange}
          />
        </div> 
        <div className='option-container'>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Option description"
              name="option_1"
              className='option'
              value={this.state.option_1.questionText}
              onChange={this.handleChange} />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Option description"
              name="option_2"
              className='option'
              value={this.state.option_2.questionText}
              onChange={this.handleChange} />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Option description"
              name="option_3"
              className='option'
              value={this.state.option_3.questionText}
              onChange={this.handleChange} />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Option description"
              name="option_4"
              className='option'
              value={this.state.option_4.questionText}
              onChange={this.handleChange} />
          </div>
          <div className='option'>
          <input
            type="radio"
            name="radio" />
          <input
            type="text"
            placeholder="Option description"
            name="option_5"
            className='option'
            value={this.state.option_5.questionText}
            onChange={this.handleChange} />
          </div>
        </div>
      </form>
    )
  }
}

export default Question