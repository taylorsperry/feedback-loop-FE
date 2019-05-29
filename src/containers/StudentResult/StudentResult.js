import React, { Component } from 'react'
import StudentResult from '../StudentResult/StudentResult'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import cogoToast from 'cogo-toast'

export class StudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentResult: [],
      classResult: [],
    }
  }

  componentDidMount = async () => {
    await this.fetchStudentResult()
    await this.fetchClassResult()
  }

  fetchStudentResult = () => {
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.survey.id}/averages/student?api_key=${myKey}`
    const studentResult = await this.props.handleGet(url)

    this.setState({
      surveyResult: studentResult
    })
  }

  fetchClassResult = () => {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.survey.id}/averages`
    const classResult = await this.props.handleGet(url)

    this.setState({
      classResult: classResult
    })
  }

  displayQuestionResult = (question) => {
    var question = question
    return(
      <div className='result-question'>
        Question: {question.description}
        Class Average: {this.state.classResult}
        Your Average: {this.state.studentResult}
      </div>
    )
  }

  render() {
    return(
      <div className='student-result'>
        <p className='response-survey-name'>{this.state.surveyName}</p>
        {this.state.studentResults.length &&
          this.props.survey.questions.map(question => {
            this.displayQuestionResult(question)
          })
        }
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  studentSurveys: state.studentSurveys,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  handlePost: (url, options) => dispatch(handlePost(url, options)),
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentResult)
