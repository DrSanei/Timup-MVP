import React, { useState, useEffect, useMemo } from 'react'
import './MyInvestments.css'
import InvestMoneyPopup from '../components/InvestMoneyPopup';
import { useNavigate } from 'react-router-dom';
import CallToActionPopup from '../components/CallToActionPopup'; 
import { supabase } from '../lib/supabaseClient'; // ⬅️ ADD

const MyInvestments = () => {
  const [showCta, setShowCta] = useState(false);
  const navigate = useNavigate();
  const [showInvestPopup, setShowInvestPopup] = useState(false);

  // NEW: state loaded from Supabase (with fallback to your current demo arrays)
  const [timeInvestments, setTimeInvestments] = useState([
    { name: 'MediTrack', type: 'Time', price: '$1.25', trend: 'up', timeSpent: '5h' },
    { name: 'FinNova',   type: 'Time', price: '$2.45', trend: 'down', timeSpent: '3h' },
  ]);

  const [moneyInvestments, setMoneyInvestments] = useState([
    { id: 1, name: 'GoldChain', type: 'Money', price: '$3.75', trend: 'up' }
  ]);

  const [assets, setAssets] = useState([
    { id: 'usd', symbol: 'USD', amount_usd: 8000 },
    { id: 'usdt', symbol: 'USDT', amount_usd: 4000 },
    { id: 'mt', symbol: 'MediTrack Shares', amount_usd: 230 },
    { id: 'fn', symbol: 'FinNova Shares', amount_usd: 340 },
    { id: 'gc', symbol: 'GoldChain Shares', amount_usd: 480 },
  ]);

  // Load from Supabase (uses visitor id from localStorage if present)
  useEffect(() => {
    let mounted = true;
    const visitorId = localStorage.getItem('timup_visitor_id') || null;

    (async () => {
      // assets
      const { data: a } = await supabase
        .from('assets')
        .select('*')
        .maybeSingle(); // you can change to .eq('visitor_id', visitorId) if you populate it

      if (mounted && a) {
        // If you have multiple, switch to select('*') and set array.
        setAssets(Array.isArray(a) ? a : [a]);
      }

      // money investments view
      const { data: mi } = await supabase
        .from('money_investments_view')
        .select('*');

      if (mounted && mi && mi.length) {
        setMoneyInvestments(mi.map(row => ({
          id: row.id,
          name: row.startup_name || '—',
          type: 'Money',
          price: row.share_price != null ? `$${row.share_price}` : '$—',
          trend: 'up'
        })));
      }

      // time investments view
      const { data: ti } = await supabase
        .from('time_investments_view')
        .select('*');

      if (mounted && ti && ti.length) {
        setTimeInvestments(ti.map(row => ({
          name: row.startup_name || '—',
          type: 'Time',
          price: row.share_price != null ? `$${row.share_price}` : '$—',
          trend: 'up',
          timeSpent: (row.time_spent_hours ?? 0) + 'h'
        })));
      }
    })();

    return () => { mounted = false; };
  }, []);

  const totalBalance = useMemo(() => {
    return assets.reduce((sum, x) => sum + (Number(x.amount_usd) || 0), 0);
  }, [assets]);

  return (
    <div className="my-investments">
      <div className="header-bar">
        <span className="header-title">🏦My Investments</span>
        <span className="balance">💰Balance:${totalBalance}</span>
      </div>  
      
      <div className="assets">
        <p><strong>Assets:</strong></p>
        {assets.map(a => (
          <div key={a.id} className="asset-line">
            <span>{a.symbol || a.name}: ${a.amount_usd}</span>
            <div className="button-group">
              <button onClick={() => setShowInvestPopup(true)}>+</button>
              <button onClick={() => setShowInvestPopup(true)}>−</button>
            </div>
          </div>
        ))}
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
              <label htmlFor={`slider-${i}`}>⏳ Time spent on project</label>
              <input type="range" id={`slider-${i}`} min="0" max="10" defaultValue="5" />
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
