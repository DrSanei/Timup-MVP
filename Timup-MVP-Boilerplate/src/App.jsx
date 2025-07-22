import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import StartupDetails from './components/StartupDetails'
import BottomNav from './components/BottomNav'
import OnboardingPopup from './components/OnboardingPopup'
import './App.css'

function App() {
  const [xp, setXp] = useState(0)
  const [tokens, setTokens] = useState(0)
  const [showPopup, setShowPopup] = useState(true)

  const handleInvest = ({ type, amount }) => {
    if (type === 'time') {
      setXp(prev => prev + amount * 10)
      setTokens(prev => prev + amount * 5)
    } else if (type === 'money') {
      setTokens(prev => prev + amount * 20)
    }
  }

  return (
    <div className="App">
      {showPopup && <OnboardingPopup onClose={() => setShowPopup(false)} />}
      <Routes>
        <Route path="/" element={<Dashboard xp={xp} tokens={tokens} />} />
        <Route path="/startup/:id" element={<StartupDetails onInvest={handleInvest} />} />
        <Route path="/investments" element={<div>My Investments (Coming soon)</div>} />
        <Route path="/feeds" element={<div>Feeds (Leaderboards/News)</div>} />
        <Route path="/profile" element={<div>Profile + Wallet (Coming soon)</div>} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App
