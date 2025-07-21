import React from 'react';

const StartupCard = ({ name, category, value, successRate }) => (
  <div className="startup-card">
    <h3>{name}</h3>
    <p>Category: {category}</p>
    <p>Estimated Value: ${value}M</p>
    <p>Success Rate: {successRate}%</p>
    <button>View Details</button>
  </div>
);

export default StartupCard;
