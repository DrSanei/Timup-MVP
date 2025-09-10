import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StartupDetails from './components/StartupDetails';
import BottomNav from './components/BottomNav';
import OnboardingPopup from './components/OnboardingPopup';
import MyInvestments from './components/MyInvestments';
import Profile from './components/Profile';
import Feeds from './components/Feeds';
import { seedStartups } from './utils/seedStartups'; // Verify this path
import './App.css';
import { logVisit } from './lib/analytics'; // ⬅️ FIXED PATH

function App() {
  const [xp, setXp] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const isSeeded = localStorage.getItem('startupsSeeded');
    if (!isSeeded) {
      seedStartups().then(() => {
        localStorage.setItem('startupsSeeded', 'true');
        console.log('Seed completed and flag set.');
      });
    }
  }, []);

  // Minimal visit log (once on first load)
  useEffect(() => {
    logVisit({ path: window.location.pathname + window.location.hash });
  }, []);

  const handleInvest = ({ type, amount }) => {
    if (type === 'time') {
      setXp((prev) => prev + amount * 10);
      setTokens((prev) => prev + amount * 5);
    } else if (type === 'money') {
      setTokens((prev) => prev + amount * 20);
    }
  };

  return (
    <div className="App">
      {showPopup && <OnboardingPopup onClose={() => setShowPopup(false)} />}
      <Routes>
        <Route path="/" element={<Dashboard xp={xp} tokens={tokens} />} />
        <Route path="/startup/:id" element={<StartupDetails onInvest={handleInvest} />} />
        <Route path="/investments" element={<MyInvestments onInvest={handleInvest} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feeds" element={<Feeds />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
