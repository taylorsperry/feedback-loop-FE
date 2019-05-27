import React, { Component } from 'react'
import Response from '../Response/Response'
import { connect } from 'react-redux'
import { handlePost } from '../../thunks/handlePost'

export class StudentSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allResponses: [],
      // fakeSurveys: this.props.studentSurveys
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
    // this.setState({
    //   currStudent: {name: 'taylor', id: 18},
    //   surveyName: this.props.studentSurveys[0].surveyName,
    //   id: this.props.studentSurveys[0].id,
    //   questions: this.props.studentSurveys[0].questions,
    //   members: this.props.studentSurveys[0].groups[0].members
    // })
  }

  
  renderResponse = () => {
    const { members, questions } = this.state
    //There's no currStudent in state, took it out of linke 50 and didn't pass down on 53
    return members.map(member => {
      return <Response key={member.id} member={member} questions={questions} collectResponses={this.collectResponses}/>
    })
  }

  collectResponses = (individualResponse) => {
    if(this.state.allResponses.length >= 1) {
      this.setState({
        allResponses: [...this.state.allResponses, ...individualResponse]
      })
    } else {
      this.setState({
        allResponses: [...individualResponse]
      })
    }
  }

  postResponse = async () => {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${this.props.user}`
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
  }

  render() {
    return(
      <div className='student-survey'>
        <p className='response-survey-name'>{this.state.surveyName}</p>
        {this.state.members && this.renderResponse()}
        <button className='response-button' onClick={this.postResponse()}>Submit Response</button>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  studentSurveys: state.studentSurveys,
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  handlePost: (url, options) => dispatch(handlePost(url, options))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentSurvey)
