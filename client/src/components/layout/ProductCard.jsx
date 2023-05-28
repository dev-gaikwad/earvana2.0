import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/ProductCard.css';
import ratingColorFilter from '../../utils/helper/filters/ratingColorFilter';
import axios from 'axios';
import authHeader from '../../utils/authentication/authHeader';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);

  const navigate = useNavigate();

  const wishlistHandler = () => {
    console.log('wishlist');
  };
  const cartHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/cart`,
        { ...product },
        { headers: authHeader() }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setInCart(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

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
          {inCart ? (
            <button className='btn-primary' onClick={() => navigate('/cart')}>
              View Cart
            </button>
          ) : (
            <button className='btn-primary' onClick={cartHandler}>
              Add to Cart
            </button>
          )}
        </div>
      </article>
    </>
  );
};

export default ProductCard;
