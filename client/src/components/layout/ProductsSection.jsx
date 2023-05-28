import React, { useContext, useState } from 'react';
import '../../css/ProductsSection.css';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';
import { SettingsIcon } from '../../utils/svg/SVGIcons';
import SmFiltersTab from './SmFiltersTab';

const ProductsSection = () => {
  const [showSmallScreenFilterTab, setShowSmallScreenFilterTab] =
    useState(false);

  const { state, allProducts, filterAndSortProducts, isLoading } =
    useContext(ProductContext);

  const filteredAndSortedProducts = filterAndSortProducts(
    allProducts,
    state.filters
  );
  return (
    <>
      <div className='products-section-container'>
        <div className='products-section-header'>
          <div className='products-section-header-title'>
            <h4>
              {state.filters.accessory
                ? state.filters.accessory
                : 'All Products'}
            </h4>
            <p>
              Showing {filteredAndSortedProducts.length} / {allProducts.length}{' '}
              products
            </p>
          </div>
          <div
            className='filter-button-container'
            onClick={() =>
              setShowSmallScreenFilterTab(!showSmallScreenFilterTab)
            }
          >
            <SettingsIcon
              width='30px'
              height='30px'
              fill='var(--primary-color)'
            />
          </div>
        </div>
        <div className='products-listing'>
          {filteredAndSortedProducts.length ? (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <h2>No products found!</h2>
          )}
        </div>
      </div>
      {showSmallScreenFilterTab && (
        <SmFiltersTab
          setShowSmallScreenFilterTab={setShowSmallScreenFilterTab}
        />
      )}
    </>
  );
};

export default ProductsSection;
