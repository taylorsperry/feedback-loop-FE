import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import cogoToast from 'cogo-toast'

export class StudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentResult: null,
      classResult: null,
    }
  }

  componentDidMount = async () => {
    await this.fetchStudentResult()
    await this.fetchClassResult()
  }

  fetchStudentResult = async () => {
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.survey.id}/averages/student?api_key=${myKey}`
    const studentResult = await this.props.handleGet(url)

    this.setState({
      studentResult: studentResult
    })
  }

  fetchClassResult = async () => {
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
        Question: {question.questionTitle}
        Class Average: {(this.state.classResult && this.state.classResult.averages) ? this.classAverage(question.id) : "Unavailable"}
        Your Average: {(this.state.studentResult && this.state.studentResult.averages) ? this.studentAverage(question.id) : "Unavailable"}
      </div>
    )
  }

  studentAverage = (question_id) => {
    var id = question_id
    let ave
    this.state.studentResult.averages.map(average => {
      if (average.question_id === id) {
        ave = average.average_rating
      }
    })
    return ave
  }

  classAverage = (question_id) => {
    var id = question_id
    let ave
    this.state.classResult.averages.map(average => {
      if (average.question_id === id) {
        ave = average.average_rating
      }
    })
    return ave
  }

  render() {
    return(
      <div className='student-result'>
        <p className='response-survey-name'>{this.props.survey.surveyName}</p>
        {this.state.studentResult &&
          this.state.studentResult.survey.questions.map(question => {
            return this.displayQuestionResult(question)
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
  handleGet: (url) => dispatch(handleGet(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentResult)
