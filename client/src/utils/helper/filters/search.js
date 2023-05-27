const filterSearchedProducts = (products, searchQuery) =>
  searchQuery
    ? products.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

export default filterSearchedProducts;
