import React, { Component } from 'react'
import Response from '../Response/Response'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'
import { handleGet } from '../../thunks/handleGet'
import { setStudentSurveys } from '../../actions'
import cogoToast from 'cogo-toast'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allResponses: [],
      membersReviewed: 0,
    }
  }

  componentDidMount() {
    const path = this.props.location.pathname
    const splitPath = path.split('/')
    const id = splitPath[splitPath.length -1]
    const storedSurveys = this.props.studentSurveys
    const foundSurvey = storedSurveys.find(survey => {
      return survey.id == id
    })
    this.setState({
      surveyName: foundSurvey.surveyName,
      id: foundSurvey.id,
      questions: foundSurvey.questions,
      members: foundSurvey.groups[0].members,
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
          api_key: this.props.user,
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