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
      return <div key={member.id} className='member-survey'>
        <p>Give {member.name} feedback</p>
        {this.renderQuestions(member.id)} 
      </div>
    })
  }

  renderQuestions = (member) => {
    const { questions} = this.state
      return questions.map(question => {
        return <div key={question.id}>
            {question.questionTitle}
            {this.renderOptions(question.id, question.options, member)}
          </div>
      })
  }

  renderOptions = (question, options, member) => {
    return options.map((option, index) => {
      return <div key={index}>
              <input 
                type='radio'
                checked={this.handlePoints(question, option.pointValue, member)}
              />
              <p>{option.description}</p>
            </div>
    })
  }

  handlePoints = (question, points, member) => {
    console.log('question', question, 'points', points, 'member', member, )
  }

  render() {
    return(
      <div className='student-survey'>
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