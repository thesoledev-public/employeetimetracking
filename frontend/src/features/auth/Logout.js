import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming the token is stored in localStorage with the key 'token'
    localStorage.removeItem('token');

    // Redirect to the login page after logout
    navigate('/login');
  }, [navigate]);

  // Render nothing or a loading indicator as needed
  return null;
};

export default Logout;
