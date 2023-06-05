import { CloseButtonIcon } from '../../utils/svg/SVGIcons';
import '../../css/AddressModal.css';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { toast } from 'react-toastify';

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
              placeholder='First Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='last_name'
              placeholder='Last Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='street_name'
              placeholder='Street Name'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='street_address'
              placeholder='Street Address'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='city'
              placeholder='City'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='number'
              name='zip_code'
              placeholder='Zipcode'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='state'
              placeholder='State'
              required
              onChange={addressDataChangeHandler}
            />
            <input
              type='text'
              name='country'
              placeholder='Country'
              required
              onChange={addressDataChangeHandler}
            />
            <button type='submit' className='btn-primary'>
              Add Address
            </button>
          </form>

          <div className='modal-buttons-container'>
            <button className='btn-secondary'>Random Address</button>
            <button className='btn-secondary'>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
