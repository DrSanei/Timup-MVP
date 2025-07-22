import React from 'react'
import StartupCard from './StartupCard'

const Dashboard = ({ xp, tokens }) => {
  const dummyStartups = [
    { id: "meditrack", name: "MediTrack", category: "HealthTech", value: 2.5, successRate: 85 },
    { id: "finnova", name: "FinNova", category: "FinTech", value: 3.1, successRate: 72 },
    { id: "goldchain", name: "GoldChain", category: "Marketplace", value: 1.8, successRate: 66 }
  ]

  return (
  <div className="dashboard-container">
    <div className="dashboard-header">
  <div className="header-row">
    <h2>Startup Market</h2>
    <p className="xp-tokens">
      <strong>XP:</strong> {xp} | <strong>Tokens:</strong> {tokens}
    </p>
  </div>
  <div className="market-tabs">
  {["Health Tech", "Fin Tech", "E-commerce", "Game", "Security", "AI", "Tourism"].map((label, index) => (
    <button key={index} className="tab">{label}</button>
  ))}
  </div>
  <div className="search-bar">
  <input type="text" placeholder="Search startups..." />
  </div>
</div>

    <div className="startup-grid">
      {dummyStartups.map((s) => (
        <StartupCard key={s.id} {...s} />
      ))}
    </div>
  </div>

)
}

export default Dashboard
