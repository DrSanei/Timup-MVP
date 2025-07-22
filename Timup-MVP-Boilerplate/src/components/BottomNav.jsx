import React from "react"
import { Link, useLocation } from "react-router-dom"
import { FaStore, FaWallet, FaNewspaper, FaUser } from "react-icons/fa"
import './BottomNav.css'

const BottomNav = () => {
  const location = useLocation()

  return (
    <div className="bottom-nav">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <FaStore />
      </Link>
      <Link to="/investments" className={location.pathname === "/investments" ? "active" : ""}>
        <FaWallet />
      </Link>
      <Link to="/feeds" className={location.pathname === "/feeds" ? "active" : ""}>
        <FaNewspaper />
      </Link>
      <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
        <FaUser />
      </Link>
    </div>
  )
}

export default BottomNav
