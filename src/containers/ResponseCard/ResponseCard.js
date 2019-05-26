import React, { Component } from 'react'

export class ResponseCard extends Component {
  constructor() {
    super();
    this.state = {
      pointValue: 0
    }
  }
  
  handleChange = (e) => {
    this.setState({
      pointValue: e.target.value
    })
  }

  render() {
    return (
      <form>
        <p>{this.props.question.questionTitle}</p>
        <div>
          <div>
            <input 
              type="radio" 
              name="option" 
              value={this.props.question.options[0].pointValue}
              onChange={this.handleChange}
            />
            <p>{this.props.question.options[0].description}</p>
          </div>
          <div>
            <input 
              type="radio" 
              name="option"
              value={this.props.question.options[1].pointValue}
              onChange={this.handleChange}
            />
            <p>{this.props.question.options[1].description}</p>
          </div>
        </div>
      </form>
    )
  }
}

export default ResponseCard