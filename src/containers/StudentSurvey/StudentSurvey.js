import React, { Component } from 'react'
import Response from '../Response/Response'
import { connect } from 'react-redux'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // surveyName: '',
      // questions: [],
      // members: [],
      // responses: []
      fakeSurveys: this.props.studentSurveys
    }
  }

  componentDidMount() {
    // const path = this.props.location.pathname
    // const splitPath = path.split('/')
    // const title = splitPath[splitPath.length -1]
    // const storedSurveys = this.props.studentSurveys
    // const foundSurvey = storedSurveys.find(survey => {
    //   return survey.surveyName === title
    // })
    // this.setState({
    //   surveyName: foundSurvey.surveyName,
    //   id: foundSurvey.id,
    //   questions: foundSurvey.questions,
    //   members: foundSurvey.groups[0].members,
    // })
    this.setState({
      currStudent: {name: 'taylor', id: 18},
      surveyName: this.props.studentSurveys[0].surveyName,
      id: this.props.studentSurveys[0].id,
      questions: this.props.studentSurveys[0].questions,
      members: this.props.studentSurveys[0].groups[0].members
    })
  }

  renderResponse = () => {
    const { members, questions, currStudent } = this.state
    return members.map(member => {
      return <Response key={member.id} member={member} questions={questions} currStudent={currStudent.id} />
    })
  }

  renderQuestions = (member) => {
    const { questions} = this.state
      return questions.map(question => {
        return <form key={question.id}>
            {question.questionTitle}
            {this.renderOptions(question.id, question.options, member)}
          </form>
      })
  }

  renderOptions = (question, options, member) => {
    return options.map((option, index) => {
      return <div key={index}>
              <input 
                type='checkbox'
                value={option.pointValue}
                onChange={this.handlePoints(question, option.pointValue, member)}
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
        <p className='response-survey-name'>{this.state.surveyName}</p>
        {this.state.members && this.renderResponse()}
      </div>
    )
  }
}

// export const mapStateToProps = (state) => ({
  // studentSurveys: state.studentSurveys
// })

// export default connect(mapStateToProps)(StudentSurvey)

export default StudentSurvey