import React, { Component } from 'react';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import PageNotFound from '../../components/PageNotFound/PageNotFound'
import NewSurvey from '../NewSurvey/NewSurvey';
import RecipientForm from '../RecipientForm/RecipientForm'
import { fetchCohorts } from '../../thunks/fetchCohorts'

export class App extends Component {

  componentDidMount() {
    this.props.fetchCohorts()
  }

  render() {
    return (
      <div className="App">
        <div>
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

export const mapDispatchToProps = (dispatch) => ({
  fetchCohorts: () => dispatch(fetchCohorts())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));