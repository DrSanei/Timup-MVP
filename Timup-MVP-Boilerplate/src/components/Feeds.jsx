import React, { useState } from 'react'
import './Feeds.css'

const Feeds = () => {
  const [tab, setTab] = useState("news")

  const news = [
    { title: "MediTrack hits 10K users!", startup: "MediTrack", id: 1 },
    { title: "FinNova secures $1M seed", startup: "FinNova", id: 2 }
  ]

  const leaderboard = [
    { name: "Ladan", profit: "$12,000" },
    { name: "Mohamad", profit: "$9,800" }
  ]

  const jobs = [
    { title: "UX Designer Needed", startup: "GoldChain", id: 3 },
    { title: "React Dev Intern", startup: "MediTrack", id: 4 }
  ]

  return (
    <div className="feeds-page">
      <div className="tab-bar">
        <button onClick={() => setTab("news")} className={tab === "news" ? "active" : ""}>News</button>
        <button onClick={() => setTab("leaderboard")} className={tab === "leaderboard" ? "active" : ""}>Leaderboard</button>
        <button onClick={() => setTab("jobs")} className={tab === "jobs" ? "active" : ""}>Jobs</button>
      </div>

      {tab === "news" && news.map(n => (
        <div key={n.id} className="news-card">
          <h4>{n.title}</h4>
          <p>🔗 Related: {n.startup}</p>
          <div className="social-icons">
            <button>❤️</button>
            <button>🔗</button>
            <button>💬</button>
          </div>
        </div>
      ))}

      {tab === "leaderboard" && leaderboard.map((p, i) => (
        <div key={i} className="leader-card">
          <p>{i + 1}. {p.name} - {p.profit}</p>
        </div>
      ))}

      {tab === "jobs" && jobs.map(j => (
        <div key={j.id} className="news-card">
          <h4>{j.title}</h4>
          <p>🧩 Startup: {j.startup}</p>
          <div className="social-icons">
            <button>❤️</button>
            <button>🔗</button>
            <button>💬</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feeds