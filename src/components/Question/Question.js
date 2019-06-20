import React, { Component } from 'react'

export class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      questionTitle: '',
      option_1: {pointValue: 1, description: ''},
      option_2: {pointValue: 2, description: ''},
      option_3: {pointValue: 3, description: ''},
      option_4: {pointValue: 4, description: ''}
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
      this.setState({  [name] : {pointValue: this.state[name].pointValue, description: value} })
  }

  handleTitleChange = (e) => {
    this.setState({
      questionTitle: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let optionsArr = []
    Object.keys(this.state).forEach(el => {
      if(el.includes('option')) {
        optionsArr.push({ [el] : {pointValue: this.state[el].pointValue, description: this.state[el].description}})
      }
    })
    let newQuestion = {
      id: this.state.id,
      questionTitle: this.state.questionTitle,
      options: optionsArr
    }
    this.props.updateQuestions(newQuestion)
  }

  render() {
    return (
      <form onBlur={this.handleSubmit} className='question-form'>
        <div>
          <input
            type="text"
            name="questionTitle"
            className="question-input"
            placeholder="Add Your Question Text"
            value={this.state.questionTitle}
            onChange={this.handleTitleChange}
            autoComplete="off"
          />
        </div>
        <div className='option-container'>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Add Response Description 1"
              name="option_1"
              id='op1'
              className='option'
              value={this.state.option_1.description}
              onChange={this.handleChange} 
              autoComplete="off"
            />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Add Response Description 2"
              name="option_2"
              className='option'
              value={this.state.option_2.description}
              onChange={this.handleChange} 
              autoComplete="off"
            />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Add Response Description 3"
              name="option_3"
              className='option'
              value={this.state.option_3.description}
              onChange={this.handleChange} 
              autoComplete="off"  
            />
          </div>
          <div className='option'>
            <input
              type="radio"
              name="radio" />
            <input
              type="text"
              placeholder="Add Response Description 4"
              name="option_4"
              className='option'
              value={this.state.option_4.description}
              onChange={this.handleChange} 
              autoComplete="off"  
            />
          </div>
        </div>
      </form>
    )
  }
}

export default Question