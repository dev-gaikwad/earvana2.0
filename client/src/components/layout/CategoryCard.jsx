import React, { useContext } from 'react';

import '../../css/CategoryCard.css';
import { ProductContext } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ SVGIcon, description, categories }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ProductContext);

  const categoryCardClickHandler = () => {
    dispatch({ type: 'CLEAR_ALL' });
    if (categories) {
      categories.map((category) =>
        dispatch({ type: 'FILTER_BY_CATEGORIES', payload: category })
      );
    }
    navigate('/products');
  };

  return (
    <div className='category-card' onClick={categoryCardClickHandler}>
      <div className='category-card-svg'>
        <SVGIcon height='50px' width='50px' />
      </div>
      <div className='category-card-description'>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
