import React, { useContext } from 'react';
import '../css/Hero.css';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const Hero = () => {
  const { dispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const shopNowClickHandler = () => {
    dispatch({ type: 'CLEAR_ALL' });
    navigate('/products');
  };
  return (
    <section className='hero'>
      <div className='hero-content'>
        <h1 className='hero-title'>Listen to Music the Way It's Meant to Be</h1>
        <button className='hero-button' onClick={shopNowClickHandler}>
          Shop Now
        </button>
      </div>
      <img src={'/images/banner02.jpg'} alt='banner02' />
    </section>
  );
};

export default Hero;
