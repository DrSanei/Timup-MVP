import React, { useState } from 'react';
import './CallToActionPopup.css';

const CallToActionPopup = ({ onClose }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [thankYou, setThankYou] = useState(false);

  // When any feedback button is clicked, show the email input box
  const handleFeedbackClick = () => setShowEmail(true);

  // When user submits their email
  const handleSubmit = (e) => {
    e.preventDefault();
    setThankYou(true);
    setTimeout(() => {
      setThankYou(false);
      setShowEmail(false);
      onClose();
    }, 1600);
  };

  // Email input popup
  if (showEmail)
    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <h3>Join the Waiting List</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{margin:'18px 0',width:'96%',padding:'10px',fontSize:'1em',borderRadius:'8px',border:'1.2px solid #bbb'}}
            />
            <button type="submit" className="cta-btn yes-add" style={{marginTop:10}}>Submit</button>
          </form>
          {thankYou && <div className="thank-you-toast">Thank you for your feedback!</div>}
        </div>
      </div>
    );

  // The initial feedback buttons
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Feedback</h3>
        <p style={{ marginBottom: 24 }}>Do you like this app?</p>
        <div className="popup-buttons-row">
          <button onClick={handleFeedbackClick} className="cta-btn no">Not at all</button>
          <button onClick={handleFeedbackClick} className="cta-btn neutral">Not yet</button>
          <button onClick={handleFeedbackClick} className="cta-btn yes">Yes</button>
        </div>
        <div className="popup-buttons-row lower-row">
          <button onClick={handleFeedbackClick} className="cta-btn yes-add">Yes, Add me to the waiting list</button>
        </div>
      </div>
    </div>
  );
};

export default CallToActionPopup;
