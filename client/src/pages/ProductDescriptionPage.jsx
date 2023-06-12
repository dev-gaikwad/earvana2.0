import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductContext } from '../context/ProductContext';
import ratingColorFilter from '../utils/helper/filters/ratingColorFilter';
import '../css/ProductDescriptionPage.css';

const ProductDescriptionPage = () => {
  const { allProducts, getAllProducts } = useContext(ProductContext);
  const { id } = useParams();

  useEffect(() => {
    getAllProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productToBeDescribed = allProducts.find(
    (product) => product._id === id
  );
  console.log(productToBeDescribed);
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
              <button className='btn-secondary'>Add To Wishlist</button>
              <button className='btn-primary'>Add to Cart</button>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default ProductDescriptionPage;
