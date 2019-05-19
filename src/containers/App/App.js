import React, { Component } from 'react';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to the Feedback Loop
          </p>
        </header>
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

export default connect(mapStateToProps)(App);