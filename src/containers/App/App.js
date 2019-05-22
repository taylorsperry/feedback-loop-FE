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


export class App extends Component {

  async componentDidMount() {
    const url = 'https://turing-feedback-api.herokuapp.com/api/v1/cohorts'
    try {
      const response = await fetch(url)
      const cohorts = await response.json()
      console.log(cohorts)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Header />
        </div>
        <div className="route-container">
          <Switch>
            <Route exact path='/'
              render={() => <Login />}
            />
            <Route exact path='/dashboard'
              render={() => <Dashboard />}
            />
            <Route exact path='/new-survey'
              render={() => <NewSurvey />}
            />
            <Route exact path='/recipients'
              render={() => <RecipientForm />}
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
  error: PropTypes.string
}

export const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  error: state.error
})

export default withRouter(connect(mapStateToProps)(App));