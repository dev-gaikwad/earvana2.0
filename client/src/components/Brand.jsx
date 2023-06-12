import React from 'react';
import '../css/Brand.css';

const Brand = ({ name, tagline }) => {
  return (
    <div className='brand'>
      <h1 className='name'>{name}</h1>
      <p className='tagline'>{tagline}</p>
    </div>
  );
};

export default Brand;
