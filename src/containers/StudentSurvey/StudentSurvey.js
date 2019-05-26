import React, { Component } from 'react'
import { connect } from 'react-redux'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      surveyName: '',
      questions: [],
      members: [],
      responses: []
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname
    const splitPath = path.split('/')
    const title = splitPath[splitPath.length -1]
    const storedSurveys = this.props.studentSurveys
    const foundSurvey = storedSurveys.find(survey => {
      return survey.surveyName === title
    })
    this.setState({
      surveyName: foundSurvey.surveyName,
      id: foundSurvey.id,
      questions: foundSurvey.questions,
      members: foundSurvey.groups[0].members,
    })
  }

  renderMembers = () => {
    const { members } = this.state
    return members.map(member => {
      return <div key={member.id}>
        <p>Give {member.name} feedback</p>
        {this.renderQuestions()} 
      </div>
    })
  }

  renderQuestions = () => {
    const { questions} = this.state
      return questions.map(question => {
        return <div key={question.id}>
            {question.questionTitle}
            {this.renderOptions(question.options)}
          </div>
      })
  }

  renderOptions = (options) => {
    return options.map((option, index) => {
      return <p key={index}>{option.description}, {option.pointValue}</p>
    })
  }

  render() {
    return(
      <div>
        {this.state.surveyName}
        {this.state.members && this.renderMembers()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  studentSurveys: state.studentSurveys
})

export default connect(mapStateToProps)(StudentSurvey)