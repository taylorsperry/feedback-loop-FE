import React, { Component } from 'react'

export class Question extends Component {
  constructor() {
    super();
    this.state = {
      questionTitle: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      option_5: ''
    }
  }
  


  render() {

    return (
      <div>
        <input
          name="option_1"
          type="checkbox"
          value={this.state.option_1}
        />
        <input
          name="option_2"
          type="checkbox"
          value={this.state.option_2}
        />
        <input
          name="option_3"
          type="checkbox"
          value={this.state.option_3}
        />
        <input
          name="option_4"
          type="checkbox"
          value={this.state.option_4}
        />
        <input
          name="option_5"
          type="checkbox"
          value={this.state.option_5}
        />
      </div>
    )
  }
}

export default Question