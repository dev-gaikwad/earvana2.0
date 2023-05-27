import React from 'react';
import '../css/Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className='hero'>
      <div className='hero-content'>
        <h1 className='hero-title'>Listen to Music the Way It's Meant to Be</h1>
        <button className='hero-button' onClick={() => navigate('/products')}>
          Shop Now
        </button>
      </div>
      <img src={'/images/banner02.jpg'} alt='banner02' />
    </section>
  );
};

export default Hero;
