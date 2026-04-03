import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    setMenuOpen(false); // close menu on logout
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar">

        <div className="logo">
          <span className="logo-icon">C</span>
          <span className="logo-text">CivicVoice</span>
        </div>

        {/* Hamburger button for mobile */}
        <button className="hamburger-btn" onClick={toggleMenu}>
          ☰
        </button>

        {/* Links container */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Users & Officers */}
          {(user?.role === "user" || user?.role === "officer") && (
            <>
              <Link to="/track" onClick={() => setMenuOpen(false)}>Track Complaint</Link>
              <Link to="/submit" onClick={() => setMenuOpen(false)}>Submit Complaint</Link>
            </>
          )}

          {/* Admin & Officers */}
          {(user?.role === "admin" || user?.role === "officer") && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
          )}

          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="nav-action-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </nav>

      <div className="navbar-offset" aria-hidden="true"></div>
    </>
  );
}