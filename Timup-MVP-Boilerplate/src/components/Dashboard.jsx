// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react'
import StartupCard from './StartupCard'
import './Dashboard.css'

// ⬇️ Use Supabase instead of Firestore
import { supabase } from '../lib/supabaseClient'

const Dashboard = ({ xp, tokens }) => {
  const [startups, setStartups] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        // 1) Fetch startups
        const { data, error } = await supabase.from('startups').select('*')
        if (error) throw error

        if (!mounted) return

        const startupsData = data || []
        setStartups(startupsData)

        const uniqueCategories = [
          'All',
          ...new Set(startupsData.map((s) => s.category).filter(Boolean)),
        ]
        setCategories(uniqueCategories)

        // 2) Log analytics: dashboard visit
        await supabase.from('analytics_events').insert([
          { event_type: 'visit', details: { page: 'dashboard' } },
        ])

        setLoading(false)
      } catch (err) {
        console.error('Error fetching startups:', err)
        if (!mounted) return
        setError('Failed to load startups. Please try again later.')
        setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="error-message">{error}</div>

  const filteredStartups =
    selectedCategory === 'All'
      ? startups
      : startups.filter((startup) => startup.category === selectedCategory)

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
  )
}

export default Dashboard
