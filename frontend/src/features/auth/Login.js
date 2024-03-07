// src/features/auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm'; // Make sure this is imported
import useLogin from './hooks/useLogin';

function Login() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { email, setEmail, password, setPassword, errorMessage, handleLogin } = useLogin();
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to toggle forms

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(navigate, apiUrl);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true); // Switch to the ForgotPasswordForm
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false); // Switch back to the LoginForm
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          {isForgotPassword ? 'Reset Password' : 'Welcome Back!'}
        </h1>
        {isForgotPassword ? (
          <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
        ) : (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            onForgotPassword={handleForgotPassword}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
