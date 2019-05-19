import React, { Component } from 'react';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import PageNotFound from '../../components/PageNotFound/PageNotFound'

export class App extends Component {

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