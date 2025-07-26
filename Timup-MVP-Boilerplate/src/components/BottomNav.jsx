import React from "react"
import { Link, useLocation } from "react-router-dom"
import { FaStore, FaWallet, FaNewspaper, FaUser } from "react-icons/fa"
import './BottomNav.css'

const BottomNav = () => {
  const location = useLocation()

  return (
    <div className="bottom-nav">
  <div className="nav-item">
    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
      <FaStore />
    </Link>
    <span className="nav-label">Market</span>
  </div>
  <div className="nav-item">
    <Link to="/investments" className={location.pathname === "/investments" ? "active" : ""}>
      <FaWallet />
    </Link>
    <span className="nav-label">My Investments</span>
  </div>
  <div className="nav-item">
    <Link to="/feeds" className={location.pathname === "/feeds" ? "active" : ""}>
      <FaNewspaper />
    </Link>
    <span className="nav-label">Feeds</span>
  </div>
  <div className="nav-item">
    <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
      <FaUser />
    </Link>
    <span className="nav-label">Profile</span>
  </div>
</div>

  )
}

export default BottomNav
