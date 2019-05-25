import React, { Component } from 'react'
import { connect } from 'react-redux'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      survey_name: '',
      questions: [],
      test: 'taylor'
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname
    const splitPath = path.split('/')
    const title = splitPath[splitPath.length -1]
    const storedSurveys = this.props.studentSurveys
    const foundSurvey = storedSurveys.find(survey => {
      return survey.survey_name === title
    })
    this.setState({
      survey_name: foundSurvey.survey_name,
      id: foundSurvey.id,
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