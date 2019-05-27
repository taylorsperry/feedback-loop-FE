import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { setStudentSurveys } from '../../actions/'

export class StudentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      // fakeSurveys: [
      //   { surveyName: 'Week 4 Survey', 
      //     id: 4, 
      //     questions: [
      //       { id: 1, 
      //         questionTitle: 'How are you today?', 
      //         options: [ { pointValue: 1, description: 'bad' }, { pointValue: 2, description: 'fine'}, { pointValue: 3, description: 'good' }, { pointValue: 4, description: 'great' } ]
      //       }, 
      //       { id: 2, 
      //         questionTitle: 'What day is it?', 
      //         options: [ { pointValue: 1, description: 'Thursday' }, { pointValue: 2, description: 'Friday'}, { pointValue: 3, description: 'Saturday' }, { pointValue: 4, description: 'Sunday' } ]
      //       }
      //     ],
      //     groups: [{ members: [{name: 'Kim', id: 3}, {name: 'April', id: 7}] }]
      //   }
      // ],
      // display: false
    }
  }

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/pending?api_key=${this.props.user}`
    const surveys = await this.props.handleGet(url)
    this.props.setStudentSurveys(surveys)
  }

  renderSurvey = (survey) => {
    // this.setState({ display: true})
    this.props.history.push(`/student-survey/${survey.surveyName}`)
    return <StudentSurvey key={survey.id} />
  }
 
  render() {
    let surveyButtons

    // if (this.state.fakeSurveys) {
    //   surveyButtons = this.state.fakeSurveys.map(survey => {
    //     return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
    //   })
    // }
    if (this.props.studentSurveys) {
      surveyButtons = this.props.studentSurveys.map(survey => {
        return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.surveyName}</button>
      })
    }
    
    return(
      <div className='dashboard-container'>
        {surveyButtons}
        {/* {this.state.display && <StudentSurvey key={Date.now()} studentSurveys={this.state.fakeSurveys} />}  */}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  studentSurveys: state.studentSurveys
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard)
