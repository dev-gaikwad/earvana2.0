import React, { useContext } from 'react';
import '../../css/OptionsTab.css';
import { ProductContext } from '../../context/ProductContext';

const categoryList = ['in_ear', 'over_ear', 'wired', 'wireless'];

const accessoriesList = ['audioset', 'players', 'tools', 'cables'];

const OptionsTab = () => {
  const { state, dispatch } = useContext(ProductContext);

  return (
    <div className='options-tab-container'>
      <div className='tab-content'>
        <div className='option-container'>
          <h3>Search</h3>
          <div className='options-list'>
            <div className='option'>
              <input
                className='search-input'
                name='search'
                type='text'
                placeholder='Search'
                onChange={(e) =>
                  dispatch({ type: 'SEARCH_PRODUCT', payload: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className='option-container'>
          <h3>Filter By</h3>
          <div className='options-list'>
            {/* <div className='option'>
              <label htmlFor='priceRange'>Price</label>
              <input
                className='price-range-input'
                type='range'
                id='priceRange'
                min={0}
                max={100000}
                step={10000}
              />
            </div> */}
            <div className='option'>
              <label>Audiophile Accessories</label>
              {accessoriesList.map((accessory, index) => (
                <label
                  key={index}
                  htmlFor={accessory}
                  className='accessory-name'
                >
                  <input
                    type='checkbox'
                    id={accessory}
                    checked={state.filters.accessory === accessory}
                    onChange={() =>
                      dispatch({
                        type: 'FILTER_BY_ACCESSORIES',
                        payload: accessory,
                      })
                    }
                  />
                  {accessory}
                </label>
              ))}
              {state.filters.accessory === 'audioset' && (
                <div className='option'>
                  <label>Headphone Category</label>
                  {categoryList.map((category, index) => (
                    <label
                      key={index}
                      htmlFor={category}
                      className='category-name'
                    >
                      <input
                        type='checkbox'
                        id={category}
                        checked={state.filters.categories.includes(category)}
                        onChange={() =>
                          dispatch({
                            type: 'FILTER_BY_CATEGORIES',
                            payload: category,
                          })
                        }
                      />
                      {category}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div className='option'>
              <label htmlFor='ratings'>Ratings</label>
              <p>
                {state.filters.rating
                  ? `${state.filters.rating} ${
                      state.filters.rating < 5 ? '+' : ''
                    }`
                  : 5}
              </p>
              <input
                id='ratings'
                className='ratings'
                name='ratings'
                type='range'
                min={1}
                max={5}
                step={1}
                defaultValue={5}
                list='rating-markers'
                onChange={(e) =>
                  dispatch({
                    type: 'FILTER_BY_RATINGS',
                    payload: +e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className='option-container'>
          <h3>Sort By</h3>
          <div className='options-list'>
            <div className='option'>
              <label htmlFor='H2L'>
                <input
                  type='radio'
                  id='H2L'
                  name='sortByPrice'
                  onChange={() =>
                    dispatch({ type: 'SORT', payload: 'highToLow' })
                  }
                />
                Price High to Low
              </label>
              <label htmlFor='L2H'>
                <input
                  type='radio'
                  id='L2H'
                  name='sortByPrice'
                  onChange={() =>
                    dispatch({ type: 'SORT', payload: 'lowToHigh' })
                  }
                />
                Price Low to High
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='tab-buttons'>
        <button
          className='btn-secondary'
          onClick={() => dispatch({ type: 'CLEAR_ALL' })}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default OptionsTab;
