import React, { Component } from 'react'
import Option from '../Option/Option'
import shortid from 'shortid'

export class Question extends Component {
  constructor() {
    super();
    this.state = {
      questionTitle: '',
      options: [
        {value: 1}, 
        {value: 2}, 
        {value: 3}, 
        {value: 4}, 
        {value: 5}
      ]
    }
  }
  


  render() {
    const options = this.state.options.map(option => {
      return <div key={shortid()}>
                <input type="radio" name="radio" />
                <input type="text" />
              </div>
    })
    return (
      <form>
        {options}
      </form>
    )
  }
}

export default Question