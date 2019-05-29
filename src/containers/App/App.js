import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from '../../components/Header/Header'
import InstructorDashboard from '../InstructorDashboard/InstructorDashboard'
import Login from '../Login/Login'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import NewSurvey from '../NewSurvey/NewSurvey';
import RecipientForm from '../RecipientForm/RecipientForm'
import StudentDashboard from '../StudentDashboard/StudentDashboard'
import StudentSurvey from '../StudentSurvey/StudentSurvey'
import { fetchCohorts } from '../../thunks/fetchCohorts'

export class App extends Component {
  componentDidMount() {
    this.props.fetchCohorts()
  }

  render() {
    const loginRoute = () => {
      if (localStorage.getItem('userRole') === 'Instructor') {
          return InstructorDashboard
      } else if (localStorage.getItem('userRole') === 'Student') {
          return StudentDashboard
      } else {
          return Login
      }
    }

    const validateStudent = () => {
      if (localStorage.getItem('userRole') === 'Student') {
        return true
      } else {
        return false
      }
    }

    const validateInstructor = () => {
      if (localStorage.getItem('userRole') === 'Instructor') {
        return true
      } else {
        return false
      }
    }

    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div className="route-container">
          <Switch>
            <Route exact path='/' component={loginRoute()}
            />
            <Route exact path='/dashboard' component={validateInstructor() ? InstructorDashboard : PageNotFound}
            />
            <Route exact path='/new-survey' component={validateInstructor() ? NewSurvey : PageNotFound}
            />
            <Route exact path='/student-dashboard' component={validateStudent() ? StudentDashboard : PageNotFound}
            />
            <Route path='/student-survey' component={validateStudent() ? StudentSurvey : PageNotFound}
            />
            <Route exact path='/recipients' component={validateInstructor() ? RecipientForm : PageNotFound}
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
