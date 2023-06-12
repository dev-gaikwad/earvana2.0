import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import CartSummary from '../components/CartSummary';
import '../css/CheckoutPage.css';

const CheckoutPage = () => {
  const user = useUser();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user.getAddresses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='checkout-page-container'>
      <div className='checkout-page-header'>
        <h3>Checkout</h3>
      </div>
      <section className='checkout-info-section'>
        <div className='checkout-address-list-container'>
          <h3>Deliver To</h3>

          {auth?.user?.addresses.map((address) => (
            <div className='address-tile' key={address._id}>
              <input
                type='radio'
                id={address._id}
                name='address'
                checked={user.selectedAddress?._id === address._id}
                onChange={() => user.setSelectedAddress(address)}
              />
              <label htmlFor={address._id}>
                <div className='address-content'>
                  <p className='address-card-name'>
                    {address.first_name} {address.last_name}
                  </p>
                  <p className='address-card-address'>
                    {address.street_name}, {address.street_address},
                    {address.city}, {address.zip_code}, {address.state},
                    {address.country}
                  </p>
                </div>
              </label>
            </div>
          ))}
          <button
            className='btn-secondary'
            onClick={() => navigate('/profile')}
          >
            {' '}
            Add Address
          </button>
        </div>
        <div className='checkout-summary'>
          <CartSummary checkout />
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
