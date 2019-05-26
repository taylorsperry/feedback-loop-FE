import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import NewSurvey from '../NewSurvey/NewSurvey';
import RecipientForm from '../RecipientForm/RecipientForm'
import StudentDashboard from '../StudentDashboard/StudentDashboard'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { fetchCohorts } from '../../thunks/fetchCohorts'
// import { setStudentSurveys } from '../../actions'

export class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     fakeSurveys: [
  //       { surveyName: 'Week 4 Survey', 
  //         id: 4, 
  //         questions: [
  //           { id: 1, 
  //             questionTitle: 'How are you today?', 
  //             options: [ { pointValue: 1, description: 'bad' }, { pointValue: 2, description: 'fine'}, { pointValue: 3, description: 'good' }, { pointValue: 4, description: 'great' } ]
  //           }, 
  //           { id: 2, 
  //             questionTitle: 'What day is it?', 
  //             options: [ { pointValue: 1, description: 'Thursday' }, { pointValue: 2, description: 'Friday'}, { pointValue: 3, description: 'Saturday' }, { pointValue: 4, description: 'Sunday' } ]
  //           }
  //         ],
  //         groups: [{ members: [{name: 'Kim', id: 3}, {name: 'April', id: 7}] }]
  //       }
  //     ]
  //   }
  // }
  componentDidMount() {
    // this.props.setStudentSurveys(this.state.fakeSurveys)
    this.props.fetchCohorts()
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div className="route-container">
          <Switch>
            <Route exact path='/' component={Login}
            />
            <Route exact path='/dashboard' component={Dashboard}
            />
            <Route exact path='/new-survey' component={NewSurvey}
            />
            <Route exact path='/student-dashboard' component={StudentDashboard}
            />
             <Route path='/student-survey' component={StudentSurvey}
            />
            <Route exact path='/recipients' component={RecipientForm}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  fetchCohorts: PropTypes.func
}

export const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  fetchCohorts: () => dispatch(fetchCohorts()),
  // setStudentSurveys: (surveys) => dispatch(setStudentSurveys(surveys))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
