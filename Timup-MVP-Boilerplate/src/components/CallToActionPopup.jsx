import React from 'react';
import './CallToActionPopup.css';

const CallToActionPopup = ({ onClose }) => (
  <div className="popup-overlay">
    <div className="popup-box">
      <h3>Feedback</h3>
      <p style={{ marginBottom: 24 }}>Do you like this app?</p>
      <div className="popup-buttons-row">
        <button onClick={onClose} className="cta-btn yes">Yes</button>
        <button onClick={onClose} className="cta-btn neutral">Not yet</button>
        <button onClick={onClose} className="cta-btn no">Not at all</button>
      </div>
    </div>
  </div>
);

export default CallToActionPopup;
