// src/hooks/useFetchUserData.js
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Ensure this path matches your project structure

const useFetchUserData = () => {
  const [userData, setUserData] = useState(null);
  const { isLoggedIn } = useAuth(); // Destructure isLoggedIn from the context

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn) {
        console.log('Not logged in, skipping user data fetch.');
        return; // Skip fetch if not logged in
      }

      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(`${apiUrl}/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [isLoggedIn]); // Depend on isLoggedIn to refetch when authentication state changes

  return userData;
};

export default useFetchUserData;
