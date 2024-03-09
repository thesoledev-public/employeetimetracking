// src/features/dashboard/hooks/useDashboardData.js
import { useState, useEffect } from 'react';

const useDashboardData = () => {
  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const apiUrl = process.env.REACT_APP_API_URL;
  //     const response = await fetch(`${apiUrl}/users/profile`, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       setUserData(data);
  //     } else {
  //       console.error('Failed to fetch user data:', response.status);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return { userData };
};

export default useDashboardData;
