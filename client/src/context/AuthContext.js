/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthServiceProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/authenticate`,
        { email, password }
      );

      toast.success(response.data.message);

      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(true);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(false);
  };

  const signUp = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          username,
          email,
          password,
        }
      );

      toast.success(response.data.message);
      signIn(email, password);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const checkTokenValidity = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/check-token`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setToken(token);
        setUser(true);
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(false);
        toast.error('Logged out, Token Expired');
      } else {
        console.error('Checking error ->', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(false);
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      checkTokenValidity(storedToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signUp, token }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
