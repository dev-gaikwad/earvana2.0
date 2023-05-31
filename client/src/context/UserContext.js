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

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/addToCart`,
        { ...product },
        { headers: authHeader() }
      );
      if (response.status === 200) {
        auth.setUser((prev) => ({ ...prev, cart: response.data.cart }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateCart = async ({ _id }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/updateCart`,
        {
          product_id: _id,
        },
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        auth.setUser((prev) => ({ ...prev, cart: response.data.cart }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteFromCart = async ({ _id }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/deleteFromCart`,
        {
          product_id: _id,
        },
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        auth.setUser((prev) => ({ ...prev, cart: response.data.cart }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getWishlist = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/wishlist`,
          { headers: authHeader() }
        );
        auth.setUser((prev) => ({ ...prev, wishlist: response.data.wishlist }));
      } catch (error) {
        console.error('Wishlist Error ->', error);
      }
    } else {
      toast.error('You need to Sign In first');
      auth.signOut();
    }
  };

  const updateWishlist = async (product) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/updateWishlist`,
        {
          ...product,
        },
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        auth.setUser((prev) => ({ ...prev, wishlist: response.data.wishlist }));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <UserContext.Provider
      value={{
        getCart,
        addToCart,
        updateCart,
        deleteFromCart,
        getWishlist,
        updateWishlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
