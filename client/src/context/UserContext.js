import { createContext, useContext, useReducer, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import authHeader from '../utils/authentication/authHeader';
import { toast } from 'react-toastify';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const auth = useAuth();

  const getCart = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/cart`,
          { headers: authHeader() }
        );
        auth.setUser((prev) => ({ ...prev, cart: response.data.cart }));
      } catch (error) {
        console.error('Cart Error ->', error);
      }
    } else {
      toast.error('You need to Sign In first');
      auth.signOut();
    }
  };

  return (
    <UserContext.Provider value={{ getCart }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
