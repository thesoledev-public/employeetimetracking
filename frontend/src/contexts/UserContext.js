// src/contexts/UserContext.js
import React, { createContext, useContext } from 'react';
import useFetchUserData from '../hooks/useFetchUserData';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const userData = useFetchUserData();

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};
