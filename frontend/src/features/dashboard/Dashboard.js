// src/features/dashboard/DashboardContainer.js
import React from 'react';
import useDashboardData from './hooks/useDashboardData';
import DashboardUI from './components/DashboardUI';

const Dashboard = () => {
  const { userData} = useDashboardData();

  return <DashboardUI userData={userData} />;
};

export default Dashboard;
