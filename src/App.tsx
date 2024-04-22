import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage'; // If you have a dashboard component
import './App.css';

const App: React.FC = () => {
  const isUserLoggedIn = () => {
    // Example: Check if a JWT token exists in localStorage to determine if user is logged in
    const token = localStorage.getItem('token');
    return !!token; // Convert to boolean
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
