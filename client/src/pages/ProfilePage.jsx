import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import AddressModal from '../components/layout/AddressModal';
import '../css/ProfilePage.css';
import { DeleteBinIcon } from '../utils/svg/SVGIcons';

const ProfilePage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    user.getAddresses();
  }, []);

  return (
    <div className='profile-page-container'>
      {auth?.user && (
        <section className='user-info-section'>
          <h2 className='user-info-heading'>
            {auth?.user?.username}'s Account
          </h2>
          <div className='account-info-container'>
            <div className='tab-options-container'>
              <ul>
                <li
                  className={`tab-name ${
                    currentTab === 0 && 'tab-name-active'
                  }`}
                  onClick={() => setCurrentTab(0)}
                >
                  Profile
                </li>
                <li
                  className={`tab-name ${
                    currentTab === 1 && 'tab-name-active'
                  }`}
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
                    <div key={address._id} className='address-card'>
                      <div className='address content'>
                        <p className='address-card-name'>
                          {address.first_name} {address.last_name}
                        </p>
                        <p className='address-card-address'>
                          {address.street_name}, {address.street_address},{' '}
                          {address.city}, {address.zip_code}, {address.state},{' '}
                          {address.country}
                        </p>
                      </div>
                      <div
                        className='delete-container'
                        onClick={() => user.deleteAddress(address)}
                      >
                        <DeleteBinIcon
                          width='24px'
                          height='24px'
                          fill='var(--accent1-color)'
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No address saved</p>
                )}
              </div>
              <button
                className='btn-secondary'
                onClick={() => setShowAddressModal(!showAddressModal)}
              >
                Add Address
              </button>
            </div>
          </div>
        </section>
      )}
      {showAddressModal && (
        <AddressModal setShowAddressModal={setShowAddressModal} />
      )}
    </div>
  );
};

export default ProfilePage;
