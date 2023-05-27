const sortProducts = (products, sort) =>
  sort
    ? products.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      )
    : products;

export default sortProducts;
