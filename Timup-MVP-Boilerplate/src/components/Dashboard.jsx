import React from 'react'
import StartupCard from './StartupCard'

const Dashboard = ({ xp, tokens }) => {
  const dummyStartups = [
    { id: "meditrack", name: "MediTrack", category: "HealthTech", value: 2.5, successRate: 85 },
    { id: "finnova", name: "FinNova", category: "FinTech", value: 3.1, successRate: 72 },
    { id: "goldchain", name: "GoldChain", category: "Marketplace", value: 1.8, successRate: 66 }
  ]

  return (
    <div>
      <h2>Startup Market</h2>
      <p><strong>XP:</strong> {xp} | <strong>Tokens:</strong> {tokens}</p>
      <div className="startup-grid">
        {dummyStartups.map((s) => (
          <StartupCard key={s.id} {...s} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
