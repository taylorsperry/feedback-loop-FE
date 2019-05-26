// import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'
//
// export class Dashboard extends Component {
//   render() {
//     return(
//       <div className='dashboard-container'>
//         <NavLink to='/new-survey'>
//           <button className='create-new-survey-button'>Create New Survey</button>
//         </NavLink>
//       </div>
//     )
//   }
// }
//
// export default Dashboard

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGet } from '../../thunks/handleGet'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { setStudentSurveys } from '../../actions/'

export class InstructorDashboard extends Component {
  constructor() {
    super();
    this.state = {
      fakeSurveys: [
        { survey_name: 'Week 4 Survey',
          id: 4,
          questions: [
            { id: 1,
              questionTitle: 'How are you today?',
              options: [ { pointValue: 1, description: 'bad' }, { pointValue: 2, description: 'fine'}, { pointValue: 3, description: 'good' }, { pointValue: 4, description: 'great' } ]
            },
            { id: 2,
              questionTitle: 'What day is it?',
              options: [ { pointValue: 1, description: 'Thursday' }, { pointValue: 2, description: 'Friday'}, { pointValue: 3, description: 'Saturday' }, { pointValue: 4, description: 'Sunday' } ]
            }
          ]
        }
      ]
    }
  }

  async componentDidMount() {
    const url = `https://turing-feedback-api.herokuapp.com/api/v1/surveys/${this.props.user.api_key}`
    // const surveys = await this.props.handleGet(url)
    // // const surveys = this.state.fakeSurveys
    // this.setState({
    //   surveys: surveys
    // })
    const surveys = this.state.fakeSurveys
    this.props.setStudentSurveys(surveys)
  }

  listSurveys = () => {
    const surveys = this.state.fakeSurveys
    return surveys.map(survey => {
      return <button key={survey.id} onClick={() => {this.renderSurvey(survey)}}>{survey.survey_name}</button>
    })
  }

  renderSurvey = (survey) => {
    this.props.history.push(`/student-survey/${survey.survey_name}`)
    return <StudentSurvey />
  }

  render() {
    return(
      <div className='dashboard-container'>
        Student Dashboard
        {this.listSurveys()}
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  handleGet: (url) => dispatch(handleGet(url)),
  setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorDashboard)
