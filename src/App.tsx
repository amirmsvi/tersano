import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage'; 
import './App.css';
//import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/PotectedRoute';


const App: React.FC = () => {

  // const isUserLoggedIn = () => {
  //   const token = localStorage.getItem('token');
  
  //   if (!token) {
  //     return false; // No token found
  //   }
  
  //   try {
  //     const decoded = jwtDecode(token); // Decode the JWT
  //     const currentTime = Date.now() / 1000; // Get the current time in seconds
  //     return decoded.exp !== undefined && decoded.exp > currentTime; // Check if the token is expired
  //   } catch (error) {
  //     return false; // If there's an error (e.g., invalid token), treat it as not logged in
  //   }
  // };

  return (
    <Router>
        <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Use ProtectedRoute to secure the dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
