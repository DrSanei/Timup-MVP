import React from 'react'
import './OnboardingPopup.css'

const OnboardingPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Timup</h3>
        <div className="onboarding-steps">
          <p>Invest your time or money</p>
          <p>Help others grow</p>
          <p>Earn your fortune</p>
        </div>
        <div className="popup-buttons">
          <button className="not-interested-btn" onClick={onClose}>Not interested</button>
          <button className="lets-go-btn" onClick={onClose}>Let`s Go!</button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPopup