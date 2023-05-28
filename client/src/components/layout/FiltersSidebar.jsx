import React, { useContext } from 'react';
import '../../css/Filters.css';
import { ProductContext } from '../../context/ProductContext';

const FiltersSidebar = () => {
  const { state, dispatch, categoryList, accessoriesList } =
    useContext(ProductContext);

  return (
    <div className='filters-content-tab'>
      <div className='tab-content'>
        <div className='filter-container'>
          <h3>Search</h3>
          <div className='filters-list'>
            <div className='filter'>
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
        <div className='filter-container'>
          <h3>Filter By</h3>
          <div className='filters-list'>
            <div className='filter'>
              <p>Accessories</p>
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
                <div className='filter'>
                  <p>Category</p>
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
            <div className='filter'>
              <label htmlFor='ratings'>
                Ratings{' '}
                {state.filters.rating ? `${state.filters.rating} +` : ''}
              </label>

              <input
                id='ratings'
                className='ratings'
                name='ratings'
                type='range'
                min={1}
                max={4}
                step={1}
                defaultValue={1}
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
        <div className='filter-container'>
          <h3>Sort By</h3>
          <div className='filters-list'>
            <div className='filter'>
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

export default FiltersSidebar;
