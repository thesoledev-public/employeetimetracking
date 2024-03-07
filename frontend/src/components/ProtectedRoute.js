import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if the token exists in localStorage (or your chosen storage)
  // Adjust "token" to whatever key you're using
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }
  return children; // User is authenticated, render the children components
};

export default ProtectedRoute;
