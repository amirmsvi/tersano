import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
