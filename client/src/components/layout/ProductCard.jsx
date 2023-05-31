import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../css/ProductCard.css';
import ratingColorFilter from '../../utils/helper/filters/ratingColorFilter';
import axios from 'axios';
import authHeader from '../../utils/authentication/authHeader';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';
import { HeartIcon } from '../../utils/svg/SVGIcons';

const ProductCard = ({ product }) => {
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const user = useUser();
  const auth = useAuth();
  const { getDiscountedPrice } = useContext(ProductContext);

  useEffect(() => {
    const existsInCart = auth?.user?.cart.some(
      (item) => item.product._id === product._id
    );

    const existsInWishlist = auth?.user.wishlist.some(
      (item) => item.product._id === product._id
    );
    setInCart(existsInCart);
    setInWishlist(existsInWishlist);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const wishlistHandler = (product) => {
    user.updateWishlist(product);
    setInWishlist(true);
  };
  const cartHandler = (product) => {
    user.addToCart(product);
    setInCart(true);
  };

  return (
    <>
      <article className='product-card'>
        <div className='product-image'>
          <img src={product.image_url} alt='product.name' />
          <div
            className='wishlist-button-container'
            onClick={() => wishlistHandler(product)}
          >
            <HeartIcon
              width='24px'
              height='24px'
              fill={inWishlist ? 'red' : 'none'}
            />
          </div>
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
                    {product.price - getDiscountedPrice(product.price)}
                  </div>
                  <s className='original-price'>{product.price}</s>
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
          {inCart ? (
            <button
              className='btn-primary btn-view-cart'
              onClick={() => navigate('/cart')}
            >
              View Cart
            </button>
          ) : (
            <button
              className='btn-primary'
              onClick={() => cartHandler(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </article>
    </>
  );
};

export default ProductCard;
