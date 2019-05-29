import React, { Component } from 'react'
import StudentResult from '../StudentResult/StudentResult'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setStudentSurveys } from '../../actions'
import cogoToast from 'cogo-toast'

export class StudentResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      studentResult: [],
      classResult: [],
    }
  }

  componentDidMount() {
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${}/averages/student?api_key=${myKey}`
    const surveys = await this.props.handleGet(url)

    this.setState({
      surveys: surveys
    })
  }

  fetchStudentResult = () => {
    const myKey = await localStorage.getItem('currentUser')
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${}/averages/student?api_key=${myKey}`
    const studentResult = await this.props.handleGet(url)

    this.setState({
      surveyResult: studentResult
    })
  }

  fetchClassResult = () => {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${}/averages`
    const classResult = await this.props.handleGet(url)

    this.setState({
      classResult: classResult
    })
  }

  renderResponse = () => {
    const { members, questions } = this.state
    return members.map(member => {
      return <Response key={member.id} member={member} questions={questions} collectResponses={this.collectResponses}/>
    })
  }

  collectResponses = (individualResponse) => {
    if(this.state.allResponses.length >= 1) {
      this.setState({
        allResponses: [...this.state.allResponses, ...individualResponse],
        membersReviewed: this.state.membersReviewed + 1
      })
    } else {
      this.setState({
        allResponses: [...individualResponse],
        membersReviewed: this.state.membersReviewed + 1
      })
    }
  }

  postResponse = async () => {
    if(this.state.membersReviewed < this.state.members.length) {
      this.warnToast('Please complete surveys before submitting your response')
    } else {
      const url = "https://turing-feedback-api.herokuapp.com/api/v1/responses"
      const options = {
        method: 'POST',
        body: JSON.stringify({
          api_key: localStorage.getItem('currentUser'),
          responses: this.state.allResponses
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.props.handlePost(url, options)
      this.handleSuccess('Thank you for completing this survey')
    }
  }

  warnToast = (message) => {
    cogoToast.warn(message, {position: 'bottom-left'})
  }

  handleSuccess = async (message) => {
    cogoToast.success(message, {position: 'bottom-left'})
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${this.props.user}`
    const surveys = await this.props.handleGet(url)
    this.props.setStudentSurveys(surveys)
    this.props.history.push('/student-dashboard')
  }

  render() {
    return(
      <div className='student-survey'>
        <p className='response-survey-name'>{this.state.surveyName}</p>
        {this.state.members && this.renderResponse()}
        <button className='response-button' onClick={this.postResponse}>Submit Response</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentSurvey)
