// src/features/dashboard/DashboardContainer.js
import React from 'react';
import useDashboardData from './hooks/useDashboardData';
import { useUser } from '../../contexts/UserContext';
import DashboardUI from './components/DashboardUI';
import Layout from '../../components/Layout'; // Adjust the path as necessary


const Dashboard = () => {
  const userData = useUser();

  return (
    <Layout>
      <DashboardUI userData={userData} />
    </Layout>
  );
};

export default Dashboard;
