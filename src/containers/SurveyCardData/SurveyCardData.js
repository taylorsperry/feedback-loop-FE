import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import PropTypes from 'prop-types'

export class SurveyCardData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averages: {},
      userAverages: {},
      survey: {}
    }
  }

  componentDidMount = async () => {
    const avgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/averages`
    const averages = await this.props.handleGet(avgsUrl)

    const userAvgsUrl = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.sData.id}/user_averages`
    const userAverages = await this.props.handleGet(userAvgsUrl)

    this.setState({
      averages: averages,
      userAverages: userAverages,
      survey: this.props.sData
    })
  }

  displayGroup = (group) => {
    return(
      <section key={group.name} className="s-group">
        <section className="s-group-name group-box">
          <article className="s-team-title">
            Group {group.name}
          </article>
          <article className="s-response-count"> Responses Received:  {this.state.averages.averages.length}
          </article>
        </section>
        {this.state.survey.questions.map(question => {
          return this.displayQuestionData(question, group)
        })}
      </section>
    )
  }

  displayQuestionData = (question, group) => {
    return(
      <section key={question.id} className="s-question-data">
        <article className="s-question group-box"> {question.questionTitle}</article>
        <article className='q-avg-rating group-box'>Survey Average: {this.state.averages.averages.length ? this.averageRating(question.id) : "Pending"}</article>
        <article className='u-ratings-container group-box'>
          {this.displayStudentData(question.id, group)}
        </article>
      </section>
    )
  }

  averageRating = (question_id) => {
    return(
      <>
        {this.state.averages.averages.map(average => {
            if (average.question_id === question_id) {
              return Number.parseFloat(average.average_rating).toFixed(2)
            }
          })
        }
      </>
    )
  }

  displayStudentData = (question_id, group) => {
    return(
      <section className="u-ratings">
        {group.members.map(member => {
          const userAve = this.findUserAve(member.id, question_id)
          return <article key={member.id} className="user-rating">
            {member.name}: {userAve ? userAve : "Pending"}
          </article>
        })}
      </section>
    )
  }

  findUserAve = (userId, question_id) => {
    let result
    this.state.userAverages.averages.map(average => {
      if (average.question_id === question_id && average.user_id === userId) {
        result = Number.parseFloat(average.average_rating).toFixed(2)
      }
    })
    return result
  }

  render() {
    return(
      <>
        {this.state.survey.hasOwnProperty("groups") &&
          <>
            <section className="s-status">
              <span className='s-status-title'>Survey Status:</span>  {this.state.survey.status}
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

SurveyCardData.propTypes = {
  error: PropTypes.string,
  handleGet: PropTypes.func,
}

export const mapStateToProps = (state) => ({
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCardData)