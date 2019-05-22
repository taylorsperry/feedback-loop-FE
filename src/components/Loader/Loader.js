import React from 'react'
import turingLogo from '../../assets/turingLogo.png'

export default function Loader() {
  return(
    <div>
      <img
        className="loading-icon"
        src={turingLogo}
        alt="loading icon, the page is loading"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )
}