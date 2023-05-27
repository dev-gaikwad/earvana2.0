import { createContext, useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const auth = useAuth();

  if (auth.user === true) {
  }

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
