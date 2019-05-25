import React from 'react';
import Logo from '../../assets/turinglogo.png'
import { Link } from "react-router-dom";

export default function Header() {
  return(
    <div className='header-container'>
      <a href='https://turing.io/'><img className='turing-logo' src={Logo} alt="logo"/></a>
      <Link to='/' className='feedback-loop-title'>
        <h2 className='feedback-loop-title-text'>Feedback Loop</h2>
      </Link>
    </div>
  )
}
