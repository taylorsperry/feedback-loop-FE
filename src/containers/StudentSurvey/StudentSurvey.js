import React, { Component } from 'react'
import { connect } from 'react-redux'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey_name: '',
      questions: []
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname
    const splitPath = path.split('/')
    const title = splitPath[splitPath.length -1]
    const storedSurveys = this.props.studentSurveys
    const foundSurvey = storedSurveys.filter(survey => {
      return survey.survey_name === title
    })
    this.findSurvey(foundSurvey)
    //go into the store, map over the surveys, find the survey with name that matches title, setState with that survey
    
  }
  
  findSurvey = (foundSurvey) => {
    this.setState({
      survey_name: foundSurvey.survey_name,
      questions: foundSurvey.questions
    })
  }

  render() {
    return(
      <div>
        {this.state.survey_name}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  studentSurveys: state.studentSurveys
})

export default connect(mapStateToProps)(StudentSurvey)