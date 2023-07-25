import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductContext } from '../context/ProductContext';
import ratingColorFilter from '../utils/helper/filters/ratingColorFilter';
import '../css/ProductDescriptionPage.css';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const ProductDescriptionPage = () => {
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const { allProducts, getAllProducts } = useContext(ProductContext);
  const { id } = useParams();

  const user = useUser();
  const auth = useAuth();

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productToBeDescribed = allProducts.find(
    (product) => product._id === id
  );

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
      {productToBeDescribed && (
        <article className='product-description-container'>
          <div className='product-image'>
            <img
              src={productToBeDescribed.image_url}
              alt={productToBeDescribed.name}
            />
          </div>
          <div className='description-content-container'>
            <h2>{productToBeDescribed.name}</h2>
            <p>{productToBeDescribed.description}</p>
            {productToBeDescribed.discount ? (
              <div className='product-price'>
                <div className='selling-price'>
                  {Math.floor(
                    productToBeDescribed.price -
                      productToBeDescribed.price * 0.1
                  )}
                </div>
                <div className='original-price'>
                  {productToBeDescribed.price}
                </div>
              </div>
            ) : (
              <div className='product-price'>
                <div className='selling-price'>
                  {productToBeDescribed.price}
                </div>
              </div>
            )}
            <div
              className={`product-rating ${ratingColorFilter(
                productToBeDescribed.rating
              )}`}
            >
              {productToBeDescribed.rating}
            </div>
            <div className='product-card-buttons-container'>
              <button
                className='btn-secondary'
                onClick={() => wishlistHandler(productToBeDescribed)}
              >
                Add To Wishlist
              </button>
              <button
                className='btn-primary'
                onClick={() => cartHandler(productToBeDescribed)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default ProductDescriptionPage;
