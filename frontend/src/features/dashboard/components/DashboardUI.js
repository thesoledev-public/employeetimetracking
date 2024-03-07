import React from 'react';

const DashboardUI = ({ userData }) => {
  // Check if userData is null or undefined and render a message or placeholder content
  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back, {userData.username}!</p>
      <a href="/logout"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Logout</a>
      {/* Additional dashboard components */}
    </div>
  );
};

export default DashboardUI;
