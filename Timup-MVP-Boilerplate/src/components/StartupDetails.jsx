import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import InvestMoneyPopup from '../components/InvestMoneyPopup';
import CallToActionPopup from '../components/CallToActionPopup'; 
import './StartupDetails.css';
import { supabase } from '../lib/supabaseClient'; // ⬅️ ADD

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ['R&D', 'Marketing', 'Operations', 'Other'],
  datasets: [
    {
      data: [40000, 30000, 20000, 10000],
      backgroundColor: ['#f39c12', '#2ecc71', '#3498db', '#9b59b6'],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const StartupDetails = () => {
  const navigate = useNavigate();
  const [showInvestPopup, setShowInvestPopup] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [showCta, setShowCta] = useState(false);

  // NEW: state for Supabase data
  const [startup, setStartup] = useState(null);
  const [projects, setProjects] = useState([]);

  // Load from Supabase (fallback to dummy if not found)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      // startup
      const { data: s, error: se } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();

      // projects
      const { data: ps, error: pe } = await supabase
        .from('projects')
        .select('*')
        .eq('startup_id', id)
        .order('created_at', { ascending: true });

      if (!isMounted) return;

      if (s) {
        setStartup({
          // map fields with fallbacks to keep your UI unchanged
          name: s.name || 'Startup',
          category: s.category || '—',
          stage: s.stage || '—',
          valuation: s.valuation_usd ? `$${Number(s.valuation_usd).toLocaleString()}` : '—',
          seeking: s.seeking_usd ? `$${Number(s.seeking_usd).toLocaleString()}` : '—',
          aiSuccessRate: s.ai_success_rate != null ? `${s.ai_success_rate}%` : '—',
          milestones: ['MVP Ready', '10K Users', '$8K MRR'],
          KPIs: ['Customer Acquisition Cost: $20', 'Churn Rate: 10%', 'Burn Rate: $20,000 per month'],
          team: [
            { name: 'Mohamad', role: 'Founder', time: '20h/week' },
            { name: 'Ladan', role: 'CTO', time: '15h/week' },
          ],
          expensesChart: 'Sample Chart',
          riskScore: 'Moderate',
          industryTrend: '↑ HealthTech +12%',
          pitchVideoUrl: 'https://www.youtube.com/embed/7a_lu7ilpnI',
          whitePaper: 'https://example.com/whitepaper.pdf',
        });
      }

      if (ps && ps.length) {
        setProjects(
          ps.map(p => ({
            // keep your UI keys
            title: p.title,
            skills: p.skills || '—',
            hours: p.hours ?? '—',
            reward: p.reward_text || '—',
          }))
        );
      }
    })();

    return () => { isMounted = false; };
  }, [id]);

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  // Fallback dummy if Supabase didn't load a startup row yet
  const fallbackStartup = {
    name: 'MediTrack',
    category: 'HealthTech',
    stage: 'Seed',
    valuation: '$2.5M',
    seeking: '$500K',
    aiSuccessRate: '83%',
    milestones: ['MVP Ready', '10K Users', '$8K MRR'],
    KPIs: ['Customer Acquisition Cost: $20', 'Churn Rate: 10%', 'Burn Rate: $20,000 per month'],
    team: [
      { name: 'Mohamad', role: 'Founder', time: '20h/week' },
      { name: 'Ladan', role: 'CTO', time: '15h/week' },
    ],
    expensesChart: 'Sample Chart',
    riskScore: 'Moderate',
    industryTrend: '↑ HealthTech +12%',
    pitchVideoUrl: 'https://www.youtube.com/embed/7a_lu7ilpnI',
    whitePaper: 'https://example.com/whitepaper.pdf',
  };

  const dataStartup = startup || fallbackStartup;

  return (
    <div className="startup-details">
      <div className="header-bar">
        <button className="header-back-btn" onClick={() => navigate(-1)}>&lt;</button>
        <h2 className="header-title">{dataStartup.name}</h2>
      </div>

      <p><strong>Market:</strong> {dataStartup.category}</p>
      <p><strong>Stage:</strong> {dataStartup.stage}</p>
      <p><strong>AI Predicted Success Rate:</strong> {dataStartup.aiSuccessRate}</p>
      <p>
        <a href={dataStartup.whitePaper} target="_blank" rel="noreferrer">
          📄 View White Paper
        </a>
      </p>

      <h4>🚀 Key Milestones</h4>
      <ul>
        {dataStartup.milestones.map((m, i) => <li key={i}>{m}</li>)}
      </ul>

      <h4>💸 Investment Section</h4>
      <p><strong>Valuation:</strong> {dataStartup.valuation}</p>
      <p><strong>Seeking:</strong> {dataStartup.seeking}</p>

      <div className="chart-container" style={{ width: '250px', height: '250px', margin: '0 auto' }}>
        <Pie data={chartData} options={options} />
        <p style={{ textAlign: 'center' }}>
          <strong>Total Expenses:</strong> $100,000
        </p>
      </div>

      <h4>👥 Team</h4>
      {dataStartup.team.map((t, i) => (
        <p key={i}>{t.name} — {t.role} ({t.time})</p>
      ))}

      <div className="video-section">
        <iframe
          width="100%"
          height="200"
          src={dataStartup.pitchVideoUrl}
          title="Pitch Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <p><strong>Key Performance Indicators:</strong> {dataStartup.KPIs.join(' | ')}</p>

      <h4>🧠 Risk & Score</h4>
      <p>Risk Level: {dataStartup.riskScore}</p>
      <p>Industry Trend: {dataStartup.industryTrend}</p>

      <h4 id="open-projects-section">📋 Open Projects</h4>
      {(projects.length ? projects : [
        { title: 'Design Landing Page', skills: 'React, Figma', hours: 10, reward: '$1000 / 2x shares' },
        { title: 'API Integration', skills: 'Node.js', hours: 15, reward: '$1150 / 2x shares' },
      ]).map((p, i) => (
        <div key={i} className="project-card">
          <strong>{p.title}</strong>
          <p>Skills: {p.skills}</p>
          <p>Time: {p.hours} hours</p>
          <p>Reward: {p.reward},</p>
          <div className="project-row-actions">
            <button className="read-more-btn">Read more ...</button>
            <button className="invest-time-btn" onClick={() => setShowCta(true)}>Invest Time</button>
          </div>
          {showCta && <CallToActionPopup onClose={() => setShowCta(false)} />}
        </div>
      ))}

      <div className="project-row-actions">
        <button className="back-btn fixed-action" onClick={() => navigate(-1)}>&lt;</button>
        <button className="invest-money-btn fixed-action" onClick={() => setShowInvestPopup(true)}>Invest Money</button>
      </div>

      {showInvestPopup && <InvestMoneyPopup onClose={() => setShowInvestPopup(false)} />}
    </div>
  );
}

export default StartupDetails;
