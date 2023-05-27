import React, { useContext, useEffect } from 'react';
import OptionsTab from '../components/layout/OptionsTab';
import ProductsSection from '../components/layout/ProductsSection';
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
      <OptionsTab />
      <ProductsSection />
    </div>
  );
};

export default ProductListingPage;
