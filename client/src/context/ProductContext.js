import { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { productReducer, initialState } from '../reducers/productReducer';
import filterSearchedProducts from '../utils/helper/filters/search';
import filterAccessoryWiseProducts from '../utils/helper/filters/accesory';
import filterCategoryWiseProducts from '../utils/helper/filters/category';
import filterRatingWiseProducts from '../utils/helper/filters/rating';
import sortProducts from '../utils/helper/filters/sort';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/product`
      );
      dispatch({
        type: 'ALL_PRODUCTS',
        payload: [response.data],
      });
      setAllProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterAndSortProducts = (products, filters) => {
    const matchedProducts = filterSearchedProducts(
      products,
      filters.searchQuery
    );

    const filteredByAccessoryProducts = filterAccessoryWiseProducts(
      matchedProducts,
      filters.accessory
    );

    const filteredByCategoriesProducts = filterCategoryWiseProducts(
      filteredByAccessoryProducts,
      filters.categories
    );
    const filteredByRatingProducts = filterRatingWiseProducts(
      filteredByCategoriesProducts,
      filters.rating
    );
    const sortedProducts = sortProducts(filteredByRatingProducts, filters.sort);

    return sortedProducts;
  };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
        getAllProducts,
        allProducts,
        filterAndSortProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
