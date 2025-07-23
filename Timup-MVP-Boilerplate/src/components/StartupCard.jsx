import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './StartupCard.css'

const StartupCard = ({ id, name, category, value }) => {
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)

  return (
    <div className="startup-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Valuation: ${value}M</p>
      <p>Foundation Date: 9/19/2022</p>
      <p>Team: ${value}M</p>
      <p>Timup is a gamified platform and startup “metaverse” where users can invest either time or money into early-stage startups via AI-powered dynamic share allocations, earning real equity, virtual assets, and reputation as startups succeed.</p>

      <div className="social-buttons">
        <button onClick={() => setLiked(!liked)} className={liked ? 'social-btn' : 'social-btn'}>❤️</button>
        <button className="social-btn">🔗</button>
        <button className="social-btn">💬</button>
      </div>

      <div className="startup-buttons">
        <button onClick={() => navigate(`/startup/${id}`)}>View Details</button>
        <button>Recent News</button>
      </div>
    </div>
  )
}

export default StartupCard

