import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/ProfilePage.css';

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const auth = useAuth();
  const navigate = useNavigate();

  const signOutClickHandler = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className='profile-page-container'>
      <section className='user-info-section'>
        <h2 className='user-info-heading'>{auth.user.username}'s Account</h2>
        <div className='account-info-container'>
          <div className='tab-options-container'>
            <ul>
              <li
                className={`tab-name ${currentTab === 0 && 'tab-name-active'}`}
                onClick={() => setCurrentTab(0)}
              >
                Profile
              </li>
              <li
                className={`tab-name ${currentTab === 1 && 'tab-name-active'}`}
                onClick={() => setCurrentTab(1)}
              >
                Address
              </li>
            </ul>
          </div>
          <div
            className={`account-tab ${
              currentTab === 0 && 'account-tab-active'
            }`}
          >
            <div className='info-content'>
              <p className='info-label'>
                Username : <span>{auth.user.username}</span>
              </p>
              <p className='info-label'>
                Email : <span>{auth.user.email}</span>
              </p>
            </div>
            <button className='btn-danger' onClick={() => auth.signOut()}>
              Sign Out
            </button>
          </div>
          <div
            className={`account-tab ${
              currentTab === 1 && 'account-tab-active'
            }`}
          >
            <div className='info-content'>
              {auth.user.addresses.length ? (
                auth.user.addresses.map((address) => (
                  <p className='info-label'>
                    Address : <span>{auth.user.address}</span>
                  </p>
                ))
              ) : (
                <p>No address saved</p>
              )}
            </div>
            <button className='btn-secondary'>Add Address</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
