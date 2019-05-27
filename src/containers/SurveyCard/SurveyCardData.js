import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserAvg from './UserAverages'
import AvgResp from './AverageResponses'

export class SurveyCardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averages: '',
      userAverages: ''
    }
  }

  componentDidMount = async () => {
    // avgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/averages`
    // avgsResponse = await fetch(avgsUrl)
    // averages = await avgsResponse.json()
    //
    // userAvgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/user_averages`
    // userAvgsResponse = await fetch(userAvgsUrl)
    // userAverages = await userAvgsResponse.json()

    this.setState({
      averages: AvgResp,
      userAverages: UserAvg
    })
  }


  displayGroup = (group) => {
    return(
      <>
        {this.state.averages &&
          <section className="s-group">{group.name}
            {this.state.averages.averages.map(question => {
              return this.displayQuestionData(question)
            })}
          </section>
        }
      </>
    )
  }

  displayQuestionData = (question) => {
    return(
      <section className="s-question-data">
        <article className="s-question">Question: {question.questionTitle}</article>
        <article className='q-avg-rating'>Class Average: {question.average_rating}</article>
        <article className='user-ratings'>
          Student Ratings: {this.displayStudentData()}
        </article>
      </section>
    )
  }

  displayStudentData = () => {

  }

  render() {
    return(
      <>
        <section className="s-status">{this.props.sData.status}</section>
        <section className="s-groups">{this.props.sData.groups.map(group => {
          return this.displayGroup(group)
        })}
        </section>
      </>
    )
  }
}

export default SurveyCardData
