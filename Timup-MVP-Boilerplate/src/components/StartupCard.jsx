import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartupCard.css';

const StartupCard = ({ id, name, category, value, openCTA }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  // Placeholder for team (to be replaced with actual team prop if added)
  const teamPlaceholder = `Team of ${value}M valuation`; // Temporary fix
  return (
    <div className="startup-card">
  <h3>{name}</h3>
  <p>Category: {category}</p>
  <p>Valuation: ${value}M</p>
  <p>Foundation Date: 9/19/2022</p>
  <p>Team: {teamPlaceholder}</p>
  <p>Timup is a gamified platform and startup “metaverse” where users can invest either time or money into early-stage startups via AI-powered dynamic share allocations, earning real equity, virtual assets, and reputation as startups succeed.</p>

  <div className="social-buttons">
    <button onClick={() => setLiked(!liked)} className={liked ? 'social-btn liked' : 'social-btn'}>❤️</button>
    <button className="social-btn">🔗</button>
    <button className="social-btn">💬</button>
  </div>

    <div className="top-buttons">
        <button className="transparent-btn" onClick={() => navigate(`/startup/${id}`)}>More Details</button>
        <button className="transparent-btn" onClick={openCTA}>Recent News</button>
      </div>
      <div className="invest-buttons">
        <button className="blue-btn" onClick={openCTA}>Invest Money</button>
        <button className="blue-btn" onClick={openCTA}>Invest Time (2x)</button>
      </div>
</div>

  );
};

export default StartupCard;