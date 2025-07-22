import React from 'react'
import { useNavigate } from 'react-router-dom'

const StartupCard = ({ id, name, category, value, }) => {
  const navigate = useNavigate()

  return (
    <div className="startup-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Valuation: ${value}M</p>
      <p>Foundation Date: 9/19/2022</p>
      <p>Team: ${value}M</p>
      <p>Timup is a gamified platform and startup “metaverse” where users can invest either time or money into early-stage startups via AI-powered dynamic share allocations, earning real equity, virtual assets, and reputation as startups succeed.</p>
      <button onClick={() => navigate(`/startup/${id}`)}>
        View Details
      </button>
    </div>
  )
}

export default StartupCard
