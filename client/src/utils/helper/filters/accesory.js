const filterAccessoryWiseProducts = (products, accesory) =>
  accesory
    ? products.filter(
        (product) => product.category.toLowerCase() === accesory.toLowerCase()
      )
    : products;

export default filterAccessoryWiseProducts;
