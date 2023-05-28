const filterRatingWiseProducts = (products, rating) =>
  rating ? products.filter((product) => product.rating >= rating) : products;

export default filterRatingWiseProducts;
