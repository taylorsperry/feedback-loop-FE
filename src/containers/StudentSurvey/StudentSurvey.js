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
    const foundSurvey = storedSurveys.find(survey => {
      return survey.survey_name === title
    })
    this.setState({
      survey_name: foundSurvey.survey_name,
      id: foundSurvey.id,
      questions: foundSurvey.questions
    })
  }
  renderQuestions = () => {
    const { questions } = this.state
    return questions.map(question => {
      return <div key={question.id}>
          {question.questionTitle}
          {this.getOptions(question.options)}
        </div>
    })
  }

  getOptions = (options) => {
    return options.map((option, index) => {
      return <p key={index}>{option.description}</p>
    })
  }
  
  render() {
    return(
      <div>
        {this.state.survey_name}
        {this.renderQuestions()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  studentSurveys: state.studentSurveys
})

export default connect(mapStateToProps)(StudentSurvey)