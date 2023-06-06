import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useUser } from '../../context/UserContext';
import { CloseButtonIcon } from '../../utils/svg/SVGIcons';
import '../../css/AddressModal.css';

const AddressModal = ({ setShowAddressModal }) => {
  const [addressFormData, setAddressFormData] = useState({
    first_name: '',
    last_name: '',
    street_name: '',
    street_address: '',
    city: '',
    zip_code: '',
    state: '',
    country: '',
  });

  const user = useUser();
  const {
    first_name,
    last_name,
    street_name,
    street_address,
    city,
    zip_code,
    state,
    country,
  } = addressFormData;

  const addressDataChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddressFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addressFormSubmitHandler = (event) => {
    event.preventDefault();
    if (
      addressFormData.zip_code.length === 5 ||
      addressFormData.zip_code.length === 6
    ) {
      // task : Add regex for zipcode validation
      user.addAddress(addressFormData);
      setShowAddressModal(false);
    } else {
      toast.error('Invalid zipcode format');
    }
  };

  // random user generator

  const generateRandomUser = async () => {
    try {
      const { data } = await axios.get(
        'https://random-data-api.com/api/v2/users'
      );
      if (data) {
        setAddressFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          street_name: data.address.street_name,
          street_address: data.address.street_address,
          city: data.address.city,
          zip_code: +data.address.zip_code,
          state: data.address.state,
          country: data.address.country,
        });
      }
    } catch (error) {
      toast.error(error.response);
    }
  };
  return (
    <div className='modal-container'>
      <div className='centered'>
        <div className='modal'>
          <div className='modal-header'>
            <h4 className='modal-heading'>Add Address</h4>

            <button
              className='btn-modal-close'
              onClick={() => setShowAddressModal(false)}
            >
              <CloseButtonIcon
                fill='var(--primary-color)'
                height='12px'
                width='12px'
              />
            </button>
          </div>

          <form className='address-form' onSubmit={addressFormSubmitHandler}>
            <input
              type='text'
              name='first_name'
              value={first_name}
              placeholder='First Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='last_name'
              value={last_name}
              placeholder='Last Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='street_name'
              value={street_name}
              placeholder='Street Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='street_address'
              value={street_address}
              placeholder='Street Address'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='city'
              value={city}
              placeholder='City'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='number'
              name='zip_code'
              value={zip_code}
              placeholder='Zipcode'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='state'
              value={state}
              placeholder='State'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='country'
              value={country}
              placeholder='Country'
              required
              onChange={addressDataChangeHandler}
            />
            <button type='submit' className='btn-primary'>
              Add Address
            </button>
          </form>

          <div className='modal-buttons-container'>
            <button className='btn-secondary' onClick={generateRandomUser}>
              Random Address
            </button>
            <button className='btn-secondary'>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
