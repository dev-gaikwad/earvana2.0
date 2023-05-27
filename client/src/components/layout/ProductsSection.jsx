import React, { useContext } from 'react';
import '../../css/ProductsSection.css';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from './ProductCard';

const ProductsSection = () => {
  const { state, allProducts, filterAndSortProducts } =
    useContext(ProductContext);

  const filteredAndSortedProducts = filterAndSortProducts(
    allProducts,
    state.filters
  );
  return (
    <div className='products-section-container'>
      {filteredAndSortedProducts ? (
        filteredAndSortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProductsSection;
