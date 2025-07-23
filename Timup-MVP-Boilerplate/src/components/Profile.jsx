import React, { useState } from 'react'
import './Profile.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const Profile = () => {
  const roiData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Personal ROI (%)',
        data: [5, 8, 12, 15, 10, 7],
        borderColor: '#00b894',
        backgroundColor: 'rgba(0, 184, 148, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'ROI (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  }

  const [isLiked, setIsLiked] = useState(false)
  const handleLikeClick = () => setIsLiked(!isLiked)

  return (
    <div className="profile-page">
      <h2>👤 My Profile</h2>
      <div className="profile-section">
        <div className="profile-photo-placeholder">👤</div>
        <p><strong>Anathema2022</strong></p>
        <p><strong>Contributed in Startups/Businesses:</strong> 13</p>
        <p><strong>Recommendation status:</strong> Strong</p>
        <p><strong>Badges:</strong> 🥇 Visionary | 🧠 Mentor</p>
        <p><strong>Experience Factor</strong> 1240</p>
        <div className="roi-chart-container">
          <Line data={roiData} options={options} />
        </div>
        <div className="social-buttons">
          <button className={`social-btn ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
            ♥
          </button>
          <button className="social-btn">↗</button>
          <button className="social-btn">💬</button>
        </div>
        <button>Edit Profile</button>
      </div>
    </div>
  )
}

export default Profile