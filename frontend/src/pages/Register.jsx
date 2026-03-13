import React from 'react'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", form);

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      alert("Registration failed");

    }

  };
  return (
    
    <div style={{ padding: "40px" }}>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

            <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            />

            <br /><br />

            <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            />

            <br /><br />

            <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />

            <br /><br />

            <button type="submit">Register</button>

        </form>

        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>

    </div>
  )
}

export default Register;
