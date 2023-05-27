export const initialState = {
  allProducts: [],
  allCategories: [],
  filters: {
    searchQuery: '',
    price: [],
    accessory: '',
    categories: [],
    rating: '',
    sort: '',
  },
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_PRODUCTS':
      return { ...state, allProducts: action.payload };

    case 'ALL_PRODUCT_CATEGORIES':
      return { ...state, allCategories: action.payload };

    case 'SEARCH_PRODUCT': {
      return {
        ...state,
        filters: { ...state.filters, searchQuery: action.payload },
      };
    }

    case 'FILTER_BY_PRICE':
      return state;

    case 'FILTER_BY_ACCESSORIES': {
      if (action.payload !== 'audioset') {
        return {
          ...state,
          filters: {
            ...state.filters,
            accessory: action.payload,
            categories: [],
          },
        };
      } else
        return {
          ...state,
          filters: { ...state.filters, accessory: action.payload },
        };
    }

    case 'FILTER_BY_CATEGORIES': {
      if (state.filters.accessory === 'audioset') {
        const isCategoryPresent = state.filters.categories.find(
          (category) => category === action.payload
        );

        return {
          ...state,
          filters: {
            ...state.filters,
            categories: isCategoryPresent
              ? state.filters.categories.filter(
                  (category) => category !== action.payload
                )
              : [...state.filters.categories, action.payload],
          },
        };
      } else return { ...state };
    }

    case 'FILTER_BY_RATINGS':
      return {
        ...state,
        filters: { ...state.filters, rating: action.payload },
      };

    case 'SORT':
      return {
        ...state,
        filters: { ...state.filters, sort: action.payload },
      };

    case 'SORT_BY_PRICE': {
      const isPricePresent = state.filters.price.find(
        (price) => price.min === action.payload.min
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          price: isPricePresent
            ? state.filters.price.filter(
                (price) => price.min !== action.payload.min
              )
            : [...state.filters.price, action.payload],
        },
      };
    }

    case 'CLEAR_ALL':
      return {
        ...state,
        searchQuery: '',
        filters: { ...initialState.filters },
      };

    default:
      return state;
  }
};
