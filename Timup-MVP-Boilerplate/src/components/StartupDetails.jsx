import React from 'react'
import { useParams } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './StartupDetails.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const StartupDetails = () => {
  const { id } = useParams()

  // Dummy data for illustration
  const startup = {
    name: "MediTrack",
    category: "HealthTech",
    stage: "Seed",
    valuation: "$2.5M",
    seeking: "$500K",
    aiSuccessRate: "83%",
    pitchVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    whitePaper: "https://example.com/whitepaper.pdf",
    website: "https://ycombinator.com",
    milestones: ["MVP Ready", "10K Users", "$8K MRR"],
    KPIs: ["Customer Acquisition Cost: $20", "Churn Rate: 10%", "Burn Rate: $20,000 per month"],
    projects: [
      { title: "Design Landing Page", skills: "React, Figma", hours: 10, reward: "$100 / 2x shares" },
      { title: "API Integration", skills: "Node.js", hours: 15, reward: "$150 / 2x shares" }
    ],
    team: [
      { name: "Mohamad", role: "Founder", time: "20h/week" },
      { name: "Ladan", role: "CTO", time: "15h/week" }
    ],
    expensesChart: "Sample Chart",
    riskScore: "Moderate",
    industryTrend: "↑ HealthTech +12%",
  }

  const chartData = {
    labels: ['R&D', 'Marketing', 'Operations', 'Other'],
    datasets: [
      {
        data: [40000, 30000, 20000, 10000],
        backgroundColor: ['#f39c12', '#2ecc71', '#3498db', '#9b59b6'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="startup-details">
      <h2>{startup.name}</h2>
      <p><strong>Category:</strong> {startup.category} | <strong>Stage:</strong> {startup.stage}</p>
      <p><strong>Valuation:</strong> {startup.valuation} | <strong>Seeking:</strong> {startup.seeking}</p>
      <p><strong>Key Performance Indicators:</strong> {startup.KPIs.join(' | ')}</p>
      <p><strong>AI Predicted Success Rate:</strong> {startup.aiSuccessRate}</p>

      <div className="video-section">
        <iframe
          width="100%"
          height="200"
          src={startup.pitchVideoUrl}
          title="Pitch Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <p><a href={startup.whitePaper} target="_blank" rel="noreferrer">📄 View White Paper</a></p>

      <h4>🚀 Key Milestones</h4>
      <ul>
        {startup.milestones.map((m, i) => <li key={i}>{m}</li>)}
      </ul>

      <h4>📋 Open Projects</h4>
      {startup.projects.map((p, i) => (
        <div key={i} className="project-card">
          <strong>{p.title}</strong>
          <p>Skills: {p.skills}</p>
          <p>Time: {p.hours} hours</p>
          <p>Reward: {p.reward}</p>
        </div>
      ))}

      <h4>👥 Team</h4>
      {startup.team.map((t, i) => (
        <p key={i}>{t.name} — {t.role} ({t.time})</p>
      ))}

      <h4>💸 Investment Section</h4>
      <div className="chart-container" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Pie data={chartData} />
      <p style={{ textAlign: 'center' }}><strong>Total Expenses:</strong> $100,000</p>
      </div>
      <p>💰 Equity or Perks: 2% equity for $500</p>

      <h4>🧠 Risk & Score</h4>
      <p>Risk Level: {startup.riskScore}</p>
      <p>Industry Trend: {startup.industryTrend}</p>

      <div className="action-buttons fixed-action">
        <button>Invest Time</button>
        <button>Invest Money</button>
      </div>
    </div>
  )
}

export default StartupDetails
