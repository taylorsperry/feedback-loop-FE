import React from 'react'
import turinglogo from '../../assets/turinglogo.png'

export default function Loader() {
  return(
    <div>
      <img
        className="loading-icon"
        src={turinglogo}
        alt="loading icon, the page is loading"
      />
      <p className="loading-text">Loading...</p>
    </div>
  )
}