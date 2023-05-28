import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { VisibilityIcon, InvisibleIcon } from '../utils/svg/SVGIcons';
import { useAuth } from '../context/AuthContext';

const SignUpPage = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const auth = useAuth();

  const { username, email, password, confirmPassword } = registerData;

  const registerDataChangeHandler = (event) => {
    const { name, value } = event.target;
    if (value.trim().length >= 3) {
      if (name === 'email') {
        const smallcaseValue = value.toLowerCase();
        setRegisterData((prev) => ({
          ...prev,
          [name]: smallcaseValue,
        }));
      } else {
        setRegisterData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const registerFormSubmitHandler = async (event) => {
    event.preventDefault();
    if (username && email && password && confirmPassword) {
      if (confirmPassword === password) {
        auth.signUp(username, email, password);
      } else {
        toast.error('Passwords do not match');
      }
    } else {
      toast.error('Data should be atleast 3 charachters');
    }
  };
  return (
    <>
      <div className='form-card'>
        <form onSubmit={registerFormSubmitHandler}>
          <input
            type='text'
            className='name-input'
            name='username'
            placeholder='Name'
            required
            onChange={registerDataChangeHandler}
          />
          <input
            type='email'
            className='email-input'
            name='email'
            placeholder='Email'
            required
            onChange={registerDataChangeHandler}
          />
          <div className='password-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='password-input'
              name='password'
              placeholder='Password'
              required
              onChange={registerDataChangeHandler}
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

          <div className='password-container'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='password-input'
              name='confirmPassword'
              placeholder='Confirm Password'
              required
              onChange={registerDataChangeHandler}
            />

            <div
              className='show-password'
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
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

          <div className='button-container'>
            <button type='submit' className='sign-btn'>
              Sign Up
            </button>
          </div>
        </form>

        <div className='alternate-option-container'>
          <p>Already have an account?</p>
          <Link to='/signin' className='link'>
            Sign In Instead
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
