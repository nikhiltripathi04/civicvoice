import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api";
import "./Login.css";
import { useAuth } from "../context/AuthContext";

import LeftHalf from "../assets/LoginPage/LeftHalf.png";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const redirectTo = location.state?.from || "/submit";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      login({
        token: res.data.token,
        user: res.data.user
      });

      navigate(redirectTo, { replace: true });

    } catch (error) {
      setErrorMessage(error.userMessage || "Invalid email or password");

    } finally {
      setIsSubmitting(false);

    }

  };

  return (

    <div className="auth-page">

         {/* HOME BUTTON */}
      <Link to="/" className="home-btn">← Home</Link>

      {/* LEFT PANEL */}

<div className="auth-left">

  <div className="left-content">

    <div className="brand">● CivicVoice</div>

    <h1>Manage civic complaints easily</h1>

    <p>
      Submit and track public issues to help improve your city.
    </p>

    <img src={LeftHalf} className="side-image" />

  </div>

</div>

      {/* RIGHT PANEL */}

      <div className="auth-right">

        <div className="auth-card">

          <h2>Sign In</h2>

          {errorMessage && <p className="auth-error">{errorMessage}</p>}

          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="switch-auth">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
          </p>

        </div>

      </div>

    </div>

  );

};

export default Login;