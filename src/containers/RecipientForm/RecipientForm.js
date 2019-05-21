import React, { Component } from 'react'

export class RecipientForm extends Component {
  constructor() {
    super()
    this.state = {
      program: ['frontend', 'backend'],
      cohorts: ['1811', '1810', '1808']
    }
  }

  //CDM will fetch cohorts

  render() {
    return(
      <div>
        <h1>Select Recipients</h1>
        Program
        <select>
          <option>test choice 1</option>
          <option>test choice 2</option>
        </select>
        Cohort
        <select>
          <option>cohort 1</option>
          <option>cohort 2</option>
        </select>
        <button>Send</button>
      </div>
    )
  }
}

export default RecipientForm