import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './Feeds.css'
import { supabase } from '../lib/supabaseClient'; // ⬅️ ADD

const Feeds = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("news");

  const [news, setNews] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: n } = await supabase
        .from('news')
        .select('id,title,startup_id')
        .order('created_at', { ascending: false });

      const { data: lb } = await supabase
        .from('leaderboard')
        .select('id,name,roi_month_percent')
        .order('roi_month_percent', { ascending: false });

      const { data: j } = await supabase
        .from('jobs')
        .select('id,title,startup_id')
        .order('created_at', { ascending: false });

      if (!mounted) return;

      setNews(n && n.length ? n.map(row => ({
        id: row.id,
        title: row.title,
        startup: row.startup_id || '—'
      })) : [
        { title: "MediTrack hits 10K users!", startup: "MediTrack", id: 1 },
        { title: "FinNova secures $1M seed", startup: "FinNova", id: 2 }
      ]);

      setLeaderboard(lb && lb.length ? lb
        .map(x => ({ name: x.name, roi: Number(x.roi_month_percent || 0) }))
        .sort((a,b) => b.roi - a.roi) : [
          { name: "Ladan", roi: 18 },
          { name: "Mohamad", roi: 15 },
          { name: "Niloofar", roi: 12 },
          { name: "Alex", roi: 7 },
          { name: "David", roi: 11 },
          { name: "Sofia", roi: 16 },
          { name: "Priya", roi: 9 },
          { name: "Wei", roi: 13 },
          { name: "Omar", roi: 14 },
          { name: "Sara", roi: 10 },
          { name: "Carlos", roi: 8 }
        ]);

      setJobs(j && j.length ? j.map(row => ({
        id: row.id,
        title: row.title,
        startup: row.startup_id || '—'
      })) : [
        { title: "UX Designer Needed", startup: "GoldChain", id: 3 },
        { title: "React Dev Intern", startup: "MediTrack", id: 4 }
      ]);
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="feeds-page">
      <div className="header-bar">
        <h2 className="header-title"> 📢 Feeds</h2>
      </div>  
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
        <div key={i} className="leader-card row-between">
          <span>{i + 1}. {p.name}</span>
          <span style={{ fontWeight: 'bold', color: '#7bffb5' }}>
            Return of Interest/Month: {p.roi}%
          </span>
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
            <button className="invest-time-btn" onClick={() => navigate(`/startup/${j.id}#open-projects-section`)}>Invest Time (2x)</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Feeds
