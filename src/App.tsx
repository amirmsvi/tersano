import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage'; // If you have a dashboard component
import './App.css';
import { jwtDecode } from 'jwt-decode';

const App: React.FC = () => {

  const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return false; // No token found
    }
  
    try {
      const decoded = jwtDecode(token); // Decode the JWT
      const currentTime = Date.now() / 1000; // Get the current time in seconds
      return decoded.exp !== undefined && decoded.exp > currentTime; // Check if the token is expired
    } catch (error) {
      return false; // If there's an error (e.g., invalid token), treat it as not logged in
    }
  };

  return (
    <Router>
      <Routes>
        {/* Redirect based on login status */}
        <Route
          path="/"
          element={
            isUserLoggedIn() ? (
              <Navigate to="/dashboard" /> // Redirect to dashboard if logged in
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )
          }
        />

        {/* Login and signup routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            isUserLoggedIn() ? (
              <DashboardPage /> // Render dashboard only if logged in
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
