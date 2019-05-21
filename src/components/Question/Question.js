import React, { Component } from 'react'
import Option from '../Option/Option'
import shortid from 'shortid'

export class Question extends Component {
  constructor() {
    super();
    this.state = {
      questionTitle: '',
      questionText: '',
      // option_1: {pointValue: 1, questionText: ''},
      // option_2: {pointValue: 1, questionText: ''},
      // option_3: {pointValue: 1, questionText: ''},
      // option_4: {pointValue: 1, questionText: ''},
      // option_5: {pointValue: 1, questionText: ''}

      // options: [
      //   {pointValue: 1, questionText: ''},
      //   {pointValue: 2, questionText: ''},
      //   {pointValue: 3, questionText: ''},
      //   {pointValue: 4, questionText: ''},
      //   {pointValue: 5, questionText: ''}
      // ]
    }
  }

  handleChange = (e) => {
    console.log(e.target)
    const { name, value } = e.target
    // this.state.options.forEach(option => {
      // console.log(option)
      this.setState({  questionText : value })
    // })
  }


  


  render() {
    const options = this.state.options.map((option, index) => {
      return <div key={shortid()}>
                <input
                  type="radio"
                  name="radio" />
                <input
                  type="text"
                  name={index}
                  value={this.state.questionText}
                  //this might be wrong
                  onChange={this.handleChange} />
              </div>
              //make 5 separate inputs in the return
              //each will have its own radio and text input
              //value on each one will correlate with what is in the state
    })
    return (
      <form>
        {options}
      </form>
    )
  }
}

export default Question