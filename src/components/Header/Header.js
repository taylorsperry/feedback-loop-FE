import React from 'react';
import Logo from '../../assets/turinglogo.png'
import { Link } from "react-router-dom";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyName: '',
      surveyExpiration: new Date(),
      questions: [],
    }
  }

export default function Header() {
  function handleClick(e) {
    e.preventDefault();
    localStorage.clear();
  }

  return(
    <div className='header-container'>
      <section className='nav-left'>
        <a href='https://turing.io/'><img className='turing-logo' src={Logo} alt="logo"/></a>
        <Link to='/' className='feedback-loop-title'>
          <h2 className='feedback-loop-title-text'>Feedback Loop</h2>
        </Link>
      </section>
      <section className='nav-right'
               style={{display: localStorage.getItem('currentUser') ? "flex" : "none"}}>
         <button className='dashboard-button'>myDashboard</button>
         <button className='logout-button'
                 onClick={handleClick}>Log Out</button>
      </section>
    </div>
  )
}
