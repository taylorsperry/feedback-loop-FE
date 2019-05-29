import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className='footer'>
        Turing School of Software and Design, a Colorado Non-Profit Organization.
        © Copyright 2017 All Rights Reserved.
      </div>
    )
  }
}
