import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage'; 
import './App.css';
//import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/PotectedRoute';


const App: React.FC = () => {


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
