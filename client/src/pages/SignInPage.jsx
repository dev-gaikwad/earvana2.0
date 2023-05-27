import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';
import { VisibilityIcon, InvisibleIcon } from '../utils/svg/SVGIcons';
import '../css/SignPages.css';

const SignInPage = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();

  const { email, password } = loginData;

  const loginDataChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      const smallcaseValue = value.toLowerCase();
      setLoginData((prev) => ({
        ...prev,
        [name]: smallcaseValue,
      }));
    } else {
      setLoginData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const loginFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (email && password) {
      auth.signIn(email, password);
    } else {
      toast.error('Enter complete data');
    }
  };
  return (
    <>
      <div className='form-card'>
        <form onSubmit={loginFormSubmitHandler}>
          <input
            type='email'
            className='email-input'
            name='email'
            placeholder='Email'
            onChange={loginDataChangeHandler}
          />
          <div className='password-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='password-input'
              name='password'
              placeholder='Password'
              onChange={loginDataChangeHandler}
            />

            <div
              className='show-password'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <VisibilityIcon
                  width='30px'
                  height='30px'
                  fill='var(--x-light-secondary-color)'
                />
              ) : (
                <InvisibleIcon
                  width='30px'
                  height='30px'
                  fill='var(--x-light-secondary-color)'
                />
              )}
            </div>
          </div>

          <Link to='/forgot-password' className='forgot-password-link'>
            Forgot Password?
          </Link>
          <div className='button-container'>
            <button type='submit' className='sign-btn'>
              Sign In
            </button>
          </div>
        </form>

        <div className='alternate-option-container'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='link'>
            Sign Up Instead
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
