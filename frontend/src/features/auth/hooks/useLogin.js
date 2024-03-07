// src/features/auth/hooks/useLogin.js
import { useState } from 'react';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (navigate, apiUrl) => {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token
      console.log('Navigation to dashboard',localStorage.getItem('token'));
      navigate('/dashboard', { replace: true, state: {} });

    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || 'Login failed. Please try again.');
    }
  };

  return { email, setEmail, password, setPassword, errorMessage, handleLogin };
};

export default useLogin;