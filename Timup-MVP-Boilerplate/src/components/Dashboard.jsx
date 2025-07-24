import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import StartupCard from './StartupCard';
import './Dashboard.css';

const Dashboard = ({ xp, tokens }) => {
  const [startups, setStartups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const startupsRef = collection(db, 'startups');
    const unsubscribe = onSnapshot(
      startupsRef,
      (snapshot) => {
        const startupsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched startups:', startupsData); // Debug log
        setStartups(startupsData);
        const uniqueCategories = ['All', ...new Set(startupsData.map((s) => s.category).filter(c => c))]; // Filter out undefined
        console.log('Extracted categories:', uniqueCategories); // Debug categories
        setCategories(uniqueCategories);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching startups:', error);
        setError('Failed to load startups. Please try again later.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const filteredStartups = selectedCategory === 'All'
    ? startups
    : startups.filter((startup) => startup.category === selectedCategory);

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
          {categories.map((category, index) => (
            <button
              key={index}
              className={`tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search startups..." />
        </div>
      </div>
      <div className="startup-grid">
        {filteredStartups.length > 0 ? (
          filteredStartups.map((startup) => (
            <StartupCard
              key={startup.id}
              id={startup.id}
              name={startup.name || 'Unnamed Startup'}
              category={startup.category || 'Uncategorized'}
              value={startup.value || 0}
            />
          ))
        ) : (
          <p>No startups found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;