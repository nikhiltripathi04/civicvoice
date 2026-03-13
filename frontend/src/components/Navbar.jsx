import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
    <nav className="navbar">

      <div className="logo">
        <span className="logo-icon">C</span>
        <span className="logo-text">CivicVoice</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/track">Track Complaint</Link>
        <Link to="/submit">Submit Complaint</Link>
        {isAuthenticated ? (
          <button type="button" onClick={logout} className="nav-action-btn">
            Logout{user?.name ? ` (${user.name})` : ""}
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

    </nav>
    <div className="navbar-offset" aria-hidden="true"></div>
    </>
  );
}