import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'

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
      <section key={question.id} className="s-question-data">
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
      <>
        {this.state.averages &&
            this.state.averages.averages.map(average => {
            if (average.question_id == question_id) {
              return average.average_rating ? Number.parseFloat(average.average_rating).toFixed(2) : "Pending"
            }
          })
        }
      </>
    )
  }

  displayStudentData = (question_id) => {
    return(
      <section className='u-ratings'>
        {this.state.userAverages &&
          this.state.userAverages.averages.map(average => {
          if (average.question_id == question_id) {
            return <article key={average.fullName} className='user-rating'>
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
        {this.state.survey ?
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
          :
          <p>NOT READY YET</p>
        }
      </>
    )
  }
}

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url))
})
export const mapStateToProps = (state) => ({
  error: state.error
})
export default connect(mapStateToProps, mapDispatchToProps)(SurveyCardData)