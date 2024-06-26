// src/Auth/Register.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/register", {
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      // Clear the form fields after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
      navigate('/login');
      
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
    <div className="login-form-container">
    <form onSubmit={handleSubmit} noValidate className="login-form">
    <h2 className="mb-4">Register</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name:</label>
        <input
          type="text"
          id="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
    {message && <div className="mt-3 alert alert-info">{message}</div>}
    <p className="mt-3" style={{marginLeft:170, color: '#555'}}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
  </div>
  <div className="login-illustration">
      <img src="images/login.svg" alt="Login Illustration" />
    </div>
  </div>



  );
};

export default Register;
