import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Implementation remains the same
  return !!localStorage.getItem('token');
};

const GuestRoute = ({ children }) => {
  if (isAuthenticated()) {
    // User is authenticated, redirect them away from guest-only routes
    return <Navigate to="/dashboard" />;
  }
  return children; // User is not authenticated, render the children components
};

export default GuestRoute;
