// src/features/auth/components/ForgotPasswordForm.js
import React from 'react';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  return (
    <form className="w-full max-w-xs">
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLogin}
          className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button">Back to Login</button>
        <button type="submit" className="...">
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
