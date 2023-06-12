import React, { useContext, useEffect } from 'react';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductsSection from '../components/ProductsSection';
import { ProductContext } from '../context/ProductContext';

import '../css/ProductsListingPage.css';

const ProductListingPage = () => {
  const { getAllProducts } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='productlisting-page-container'>
      <div className='lg-filters-tab-container'>
        <FiltersSidebar />
      </div>
      <ProductsSection />
    </div>
  );
};

export default ProductListingPage;
