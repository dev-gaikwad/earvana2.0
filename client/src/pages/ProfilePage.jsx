import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const signOutClickHandler = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className='profile-page-container'>
      <h1>Profile Page</h1>
      <button onClick={() => navigate('/wishlist')}>Wishlist</button>
      <button onClick={signOutClickHandler}>Sign Out</button>
    </div>
  );
};

export default ProfilePage;
