import React, { useState } from 'react'
import './MyInvestments.css'
import InvestMoneyPopup from '../components/InvestMoneyPopup';
import { useNavigate } from 'react-router-dom';
import CallToActionPopup from '../components/CallToActionPopup'; 


const MyInvestments = () => {
  const [showCta, setShowCta] = useState(false);
  const navigate = useNavigate();
  const [showInvestPopup, setShowInvestPopup] = useState(false);

  const timeInvestments = [
    {
      name: 'MediTrack',
      type: 'Time',
      price: '$1.25',
      trend: 'up',
      timeSpent: '5h'
    },
    {
      name: 'FinNova',
      type: 'Time',
      price: '$2.45',
      trend: 'down',
      timeSpent: '3h'
    }
  ];

  const moneyInvestments = [
    {
      id: 1, // <--- Added id property
      name: 'GoldChain',
      type: 'Money',
      price: '$3.75',
      trend: 'up'
    }
  ];

  const totalBalance = 8000 + 4000 + 230 + 340 + 480

  return (
    

    <div className="my-investments">
      <div className="header-bar">
    <span className="header-title">🏦My Investments</span>
    <span className="balance">💰Balance:${totalBalance}</span>
    </div>  
      
      <div className="assets">
        <p><strong>Assets:</strong></p>
        <div className="asset-line">
          <span>🟩 USD: $8000</span>
          <div className="button-group">
            <button onClick={() => setShowInvestPopup(true)}>+</button>
            <button onClick={() => setShowInvestPopup(true)}>−</button>
          </div>
        </div>
        <div className="asset-line">
          <span>🟨 USDT: $4000</span>
          <div className="button-group">
            <button onClick={() => setShowInvestPopup(true)}>+</button>
            <button onClick={() => setShowInvestPopup(true)}>−</button>
          </div>
        </div>
        <div className="asset-line">
          <span>📦 MediTrack Shares: $230</span>
          <div className="button-group">
            <button onClick={() => setShowInvestPopup(true)}>+</button>
            <button onClick={() => setShowInvestPopup(true)}>−</button>
          </div>
        </div>
        <div className="asset-line">
          <span>📦 FinNova Shares: $340</span>
          <div className="button-group">
            <button onClick={() => setShowInvestPopup(true)}>+</button>
            <button onClick={() => setShowInvestPopup(true)}>−</button>
          </div>
        </div>
        <div className="asset-line">
          <span>📦 GoldChain Shares: $480</span>
          <div className="button-group">
            <button onClick={() => setShowInvestPopup(true)}>+</button>
            <button onClick={() => setShowInvestPopup(true)}>−</button>
          </div>
        </div>
      </div>

      <h3>🕒 Time Investments</h3>
      <div className="investment-list">
        {timeInvestments.map((inv, i) => (
          <div key={i} className="investment-card">
            <h4>{inv.name}</h4>
            <div className="timer-section">
            <button className="green" onClick={() => setShowCta(true)}>▶</button>
            <p className="timer-count">00:23:12</p>
            </div>
            <p>Investing: {inv.type}</p>
            <p>Today's Share Price: {inv.price} {inv.trend === 'up' ? '⬆️' : <span className="red">⬇️</span>}</p>
            <p className="time-spent">⏱ Total time spent: {inv.timeSpent}</p>
            <div className="card-buttons-row">
              <button className="blue" onClick={() => setShowInvestPopup(true)}>Buy/Sell Shares</button>
              <button className="blue">Message</button>
            </div>
            <div className="slider-section">
              <label htmlFor="slider">⏳ Time spent on project</label>
              <input type="range" id="slider" min="0" max="10" value="5" />
            </div>
            {showCta && <CallToActionPopup onClose={() => setShowCta(false)} />}
          </div>
        ))}
      </div>

      <h3>💸 Money Investments</h3>
      <div className="investment-list">
        {moneyInvestments.map((inv, i) => (
          <div key={i} className="investment-card">
            <h4>{inv.name}</h4>
            <p>Investing: {inv.type}</p>
            <p>Today's Share Price: {inv.price} {inv.trend === 'up' ? '⬆️' : <span className="red">⬇️</span>}</p>
            <div className="card-buttons-row">
              <button className="blue" onClick={() => setShowInvestPopup(true)}>Buy/Sell Shares</button>
              <button className="blue">Message</button>
            </div>
            <button
              className="wide invest-time"
              onClick={() => navigate(`/startup/${inv.id}#open-projects-section`)}
            >
              Invest Time (2x)
            </button>
          </div>
        ))}
      </div>
      {showInvestPopup && <InvestMoneyPopup onClose={() => setShowInvestPopup(false)} />}
    </div>
  )
}

export default MyInvestments
