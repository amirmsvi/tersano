import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if a user is authenticated
const isAuthenticated = (): boolean => { // Explicitly specify the return type
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  return token !== null; // Return true if a token is found
};

// Protected Route component
interface ProtectedRouteProps {
  children: ReactElement; // Define the expected type for children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
