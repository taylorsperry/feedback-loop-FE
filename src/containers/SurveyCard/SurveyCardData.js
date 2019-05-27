import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserAvg from './UserAverages'
import AvgResp from './AverageResponses'

export class SurveyCardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averages: null,
      userAverages: null,
      survey: null
    }
  }

  componentDidMount = async () => {
    const avgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/averages`
    const avgsResponse = await fetch(avgsUrl)
    const averages = await avgsResponse.json()

    const userAvgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/user_averages`
    const userAvgsResponse = await fetch(userAvgsUrl)
    const userAverages = await userAvgsResponse.json()

    const surveyUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}`
    const surveyResponse = await fetch(surveyUrl)
    const survey = await surveyResponse.json()

    this.setState({
      averages: averages,
      userAverages: userAverages,
      survey: survey
    })
  }

  displayGroup = (group) => {
    return(
      <section className="s-group">
        <section className="s-group-name group-box">
          Group {group.name}
        </section>
        {this.state.survey.questions.map(question => {
          return this.displayQuestionData(question)
        })}
      </section>
    )
  }

  displayQuestionData = (question) => {
    return(
      <section className="s-question-data">
        <article className="s-question group-box"> {question.questionTitle}</article>
        <article className='q-avg-rating group-box'>Survey Average: {this.state.averages ? this.averageRating(question.id) : "Pending"}</article>
        <article className='u-ratings-container group-box'>
          {this.displayStudentData(question.id)}
        </article>
      </section>
    )
  }

  averageRating = (question_id) => {
    return(
      this.state.averages.averages.map(average => {
        if (average.question_id == question_id) {
          return average.average_rating ? Number.parseFloat(average.average_rating).toFixed(2) : "Pending"
        }
      })
    )
  }

  displayStudentData = (question_id) => {
    return(
      <section className='u-ratings'>
        {this.state.userAverages.averages.map(average => {
          if (average.question_id == question_id) {
            return <article className='user-rating'>
              {average.fullName}: {average.average_rating ? Number.parseFloat(average.average_rating).toFixed(2) : "Pending"}
            </article>
          }
        })}
      </section>
    )
  }

  render() {
    return(
      <>
        {this.state.survey &&
          <>
            <section className="s-status">
              Survey Status:  {this.state.survey.status}
            </section>
            <section className="s-groups">
              {this.state.survey.groups.map(group => {
                return this.displayGroup(group)
              })}
            </section>
          </>
        }
      </>
    )
  }
}

export default SurveyCardData
