import React, { useState } from "react";
import "./InvestMoneyPopup.css";
import CallToActionPopup from './CallToActionPopup';


const MAX_AMOUNT = 12000;
const MAX_SHARES = 10;

export default function InvestMoneyPopup({ onClose }) {
  const [amount, setAmount] = useState(0);
  const [shares, setShares] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showCta, setShowCta] = useState(false);


  // Sync amount and shares
  const handleAmountChange = (val) => {
    const a = Number(val);
    if (a > MAX_AMOUNT) {
      triggerError();
      return;
    }
    setAmount(a);
    setShares(Number(((a / MAX_AMOUNT) * MAX_SHARES).toFixed(2)));
  };

  const handleSharesChange = (val) => {
    const s = Number(val);
    if (s > MAX_SHARES) {
      triggerError();
      return;
    }
    setShares(s);
    setAmount(Number(((s / MAX_SHARES) * MAX_AMOUNT).toFixed(0)));
  };

  const triggerError = () => {
    setShowError(true);
    setAmount(0);
    setShares(0);
    setTimeout(() => setShowError(false), 1500);
  };

  const handleConfirm = () => {
  setShowSuccess(true);
  setTimeout(() => {
    setShowSuccess(false);
    setShowCta(true);     // Show CTA after success
  }, 1800);
};
const handleCtaClose = () => {
  setShowCta(false);
  onClose(); // close InvestMoneyPopup too
};


  return (
  <>
    {/* If showCta, ONLY render CallToActionPopup */}
    {showCta ? (
      <CallToActionPopup onClose={handleCtaClose} />
    ) : (
      <>
        <div className="popup-overlay" onClick={onClose}></div>
        <div className="invest-popup">
          <h3>Invest Money</h3>
          <div className="input-row">
            <label>
              Amount ($):
              <input
                type="number"
                min="0"
                max={MAX_AMOUNT}
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
              />
            </label>
            <input
              type="range"
              min="0"
              max={MAX_AMOUNT}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
          </div>
          <div className="input-row">
            <label>
              Shares (%):
              <input
                type="number"
                min="0"
                max={MAX_SHARES}
                value={shares}
                onChange={(e) => handleSharesChange(e.target.value)}
              />
            </label>
            <input
              type="range"
              min="0"
              max={MAX_SHARES}
              step="0.01"
              value={shares}
              onChange={(e) => handleSharesChange(e.target.value)}
            />
          </div>
          <button className="read-contract-btn" onClick={() => window.open("/contract.pdf", "_blank")}>
            Contract and Cash-out terms
          </button>
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm Buy and Accept the Terms
          </button>
          {showSuccess && (
            <div className="success-toast">Your buy is successful!</div>
          )}
          {showError && (
            <div className="error-toast">Amount exceeded</div>
          )}
          <button className="close-btn" onClick={onClose} title="Close">&times;</button>
        </div>
      </>
    )}
  </>
);

}
