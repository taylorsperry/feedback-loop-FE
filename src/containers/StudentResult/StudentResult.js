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
      dataDisplay: "none"
    }
  }

  componentDidMount = async () => {
    await this.fetchStudentResult()
    await this.fetchClassResult()
  }

  toggleData = () => {
    let display
    this.state.dataDisplay === "none"
    ? display = "flex"
    : display = "none"

    this.setState({
      dataDisplay: display
    })
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
        <p>{question.questionTitle}</p>
        <p>Class Average: {(this.state.classResult && this.state.classResult.averages.length) ? Number.parseFloat(this.classAverage(question.id)).toFixed(2) : "Unavailable"}</p>
        <p>Your Average: {(this.state.studentResult && this.state.studentResult.averages.length) ? Number.parseFloat(this.studentAverage(question.id)).toFixed(2) : "Unavailable"}</p>
      </div>
    )
  }

  studentAverage = (question_id) => {
    var id = question_id
    let ave = null
    this.state.studentResult.averages.map(average => {
      if (average.question_id === id && average.average_rating) {
        ave = average.average_rating
      }
    })
    return ave
  }

  classAverage = (question_id) => {
    var id = question_id
    let ave = null
    this.state.classResult.averages.map(average => {
      if (average.question_id === id && average.average_rating) {
        ave = average.average_rating
      }
    })
    return ave
  }

  render() {
    return(
      <div className='student-result'>
        <p className='result-card'
           onClick={this.toggleData}>{this.props.survey.surveyName}
        </p>
        <div className='result-data'
             style={{display: this.state.dataDisplay}}>
        {this.state.studentResult &&
          this.state.studentResult.survey.questions.map(question => {
            return this.displayQuestionResult(question)
          })
        }
        </div>
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
