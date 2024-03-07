// src/features/auth/components/LoginForm.js
import React from 'react';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit, errorMessage, onForgotPassword }) => {
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs">
      {errorMessage && <div className="mb-3 text-red-500">{errorMessage}</div>}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
       <button
          onClick={onForgotPassword}
          className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button">Forgot Password?</button>
      </div>
      <div className="flex items-center justify-between">
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
