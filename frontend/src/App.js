import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './features/auth/Login';
import Logout from './features/auth/Logout';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component


// Example authentication check function
const isAuthenticated = () => {
  // Implement your authentication check here
  // For example, check for a token in localStorage
  return localStorage.getItem('token') ? true : false;
};

function App() {
  useEffect(() => {
    // Set the body background color when the component mounts
    document.body.className = 'bg-gray-100';

    // Optionally, clean up by resetting the background color when the component unmounts
    return () => {
      document.body.className = '';
    };
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />      

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;