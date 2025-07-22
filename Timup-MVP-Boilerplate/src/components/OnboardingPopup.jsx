import React from 'react'
import './OnboardingPopup.css'

const OnboardingPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Welcome to Timup</h3>
        <p>Invest your time or money in ideas and teams and earn your fortune.</p>
        <div className="popup-buttons">
          <button onClick={onClose}>Not interested</button>
          <button onClick={onClose}>Let`s Go!</button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPopup
