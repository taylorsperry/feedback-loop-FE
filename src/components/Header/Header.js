import React, { Component } from 'react';
import Logo from '../../assets/turinglogo.png'
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleClick = (e) => {
    localStorage.clear();
    this.forceUpdate();
  }

  render() {
    return(
      <div className='header-container'>
        <section className='nav-left'>
          <a href='https://turing.io/'><img className='turing-logo' src={Logo} alt="logo"/></a>
          <Link to='/' className='feedback-loop-title'>
            <h2 className='feedback-loop-title-text'>Feedback Loop</h2>
          </Link>
        </section>
        { localStorage.getItem('currentUser') &&
          <ul className='nav-right'>
            <li>
              <a href='' className='nav-link'>Dashboard</a>
            </li>
            <li>
              <a href='' className='nav-link'
                         onClick={this.handleClick}>Log Out</a>
            </li>
          </ul>
         }
      </div>
    )
  }
}
