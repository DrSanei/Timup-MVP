import React from 'react'
import { useNavigate } from 'react-router-dom'

const StartupCard = ({ id, name, category, value }) => {
  const navigate = useNavigate()

  return (
    <div className="startup-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Valuation: ${value}M</p>
      <button onClick={() => navigate(`/startup/${id}`)}>
        View Details
      </button>
    </div>
  )
}

export default StartupCard
