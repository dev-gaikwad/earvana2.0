import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Brand from './Brand';
import {
  CartIcon,
  CloseButtonIcon,
  ExploreIcon,
  HamburgerMenuIcon,
  ProfileIcon,
  SignInIcon,
  SignUpIcon,
} from '../../utils/svg/SVGIcons';
import '../../css/Navbar.css';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = (route) => route === location.pathname;
  return (
    <>
      <div className='navbar-container'>
        <div className='logo' onClick={() => navigate('/')}>
          <Brand name={`${'{Earvana}'}`} tagline={'Escape into Audio Heaven'} />
        </div>
        <nav>
          <ul className='navbar-menu-options-container'>
            <li className='navbar-list-item' onClick={() => navigate('/')}>
              <ExploreIcon
                fill={
                  currentRoute('/')
                    ? 'var(--primary-color)'
                    : 'var(--x-light-secondary-color)'
                }
                width='30px'
                height='30px'
              />
              <p
                className={
                  currentRoute('/')
                    ? 'navbar-list-item-name-active'
                    : 'navbar-list-item-name'
                }
              >
                Explore
              </p>
            </li>

            {auth.user ? (
              <li
                className='navbar-list-item'
                onClick={() => navigate('/profile')}
              >
                <ProfileIcon
                  fill={
                    currentRoute('/profile')
                      ? 'var(--primary-color)'
                      : 'var(--x-light-secondary-color)'
                  }
                  width='30px'
                  height='30px'
                />
                <p
                  className={
                    currentRoute('/profile')
                      ? 'navbar-list-item-name-active'
                      : 'navbar-list-item-name'
                  }
                >
                  Profile
                </p>
              </li>
            ) : (
              <li
                className='navbar-list-item'
                onClick={() => navigate('/signin')}
              >
                <SignInIcon
                  fill={
                    currentRoute('/signin')
                      ? 'var(--primary-color)'
                      : 'var(--x-light-secondary-color)'
                  }
                  width='30px'
                  height='30px'
                />
                <p
                  className={
                    currentRoute('/signin')
                      ? 'navbar-list-item-name-active'
                      : 'navbar-list-item-name'
                  }
                >
                  Sign In
                </p>
              </li>
            )}

            {auth.user ? (
              <li
                className='navbar-list-item'
                onClick={() => navigate('/cart')}
              >
                <CartIcon
                  fill={
                    currentRoute('/cart')
                      ? 'var(--primary-color)'
                      : 'var(--x-light-secondary-color)'
                  }
                  width='30px'
                  height='30px'
                />
                <p
                  className={
                    currentRoute('/cart')
                      ? 'navbar-list-item-name-active'
                      : 'navbar-list-item-name'
                  }
                >
                  Cart
                </p>
              </li>
            ) : (
              <li
                className='navbar-list-item'
                onClick={() => navigate('/signup')}
              >
                <SignUpIcon
                  fill={
                    currentRoute('/signup')
                      ? 'var(--primary-color)'
                      : 'var(--x-light-secondary-color)'
                  }
                  width='30px'
                  height='30px'
                />
                <p
                  className={
                    currentRoute('/signup')
                      ? 'navbar-list-item-name-active'
                      : 'navbar-list-item-name'
                  }
                >
                  Sign Up
                </p>
              </li>
            )}
          </ul>
          <div
            className='navbar-hamburger-menu'
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <HamburgerMenuIcon width='30px' height='30px' />
          </div>
        </nav>
      </div>
      {displayMenu && (
        <div className='sm-navbar-menu-options-container'>
          <div
            className='sm-navbar-header'
            onClick={() => setDisplayMenu(!displayMenu)}
          >
            <CloseButtonIcon width='30px' height='30px' fill={'white'} />
          </div>
          <ul>
            <li
              className='sm-navbar-list-item'
              onClick={() => {
                navigate('/');
                setDisplayMenu(false);
              }}
            >
              Explore
            </li>
            <li
              className='sm-navbar-list-item'
              onClick={() => {
                navigate('/profile');
                setDisplayMenu(false);
              }}
            >
              Profile
            </li>
            <li
              className='sm-navbar-list-item'
              onClick={() => {
                navigate('/cart');
                setDisplayMenu(false);
              }}
            >
              Cart
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
