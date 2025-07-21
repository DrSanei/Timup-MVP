import React from 'react';
import StartupCard from './StartupCard';

const Dashboard = () => {
  const dummyStartups = [
    { name: "MediTrack", category: "HealthTech", value: 2.5, successRate: 85 },
    { name: "FinNova", category: "FinTech", value: 3.1, successRate: 72 },
    { name: "GoldChain", category: "Marketplace", value: 1.8, successRate: 66 },
  ];

  return (
    <div>
      <h2>Startups Market</h2>
      <div className="startup-grid">
        {dummyStartups.map((s, i) => <StartupCard key={i} {...s} />)}
      </div>
    </div>
  );
};

export default Dashboard;
