import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/ProductCard.css';
import ratingColorFilter from '../../utils/helper/filters/ratingColorFilter';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const wishlistHandler = () => {
    console.log('wishlist');
  };
  const cartHandler = () => {};

  return (
    <>
      <article className='product-card'>
        <div
          onClick={() => navigate(`/products/${product._id}`)}
          className='product-image'
        >
          <img src={product.image_url} alt='product.name' />
        </div>
        <div
          onClick={() => navigate(`/products/${product._id}`)}
          className='product-description'
        >
          <div className='product-info-header'>
            <div className='product-brand'>{product.brand}</div>
            <div className='product-category'>
              <p>{product.category}</p>
            </div>
          </div>
          <div className='product-name'>
            <h3>{product.name}</h3>
          </div>

          <div className='product-price-rating-container'>
            <div className='product-price-container'>
              {product.discount ? (
                <div className='product-price'>
                  <div className='selling-price'>
                    {Math.floor(product.price - product.price * 0.1)}
                  </div>
                  <div className='original-price'>{product.price}</div>
                </div>
              ) : (
                <div className='product-price'>
                  <div className='selling-price'>{product.price}</div>
                </div>
              )}
            </div>
            <div
              className={`product-rating ${ratingColorFilter(product.rating)}`}
            >
              {product.rating}
            </div>
          </div>
        </div>

        <div className='product-card-buttons-container'>
          <button className='btn-secondary' onClick={wishlistHandler}>
            Add To Wishlist
          </button>
          <button className='btn-primary' onClick={cartHandler}>
            Add to Cart
          </button>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
