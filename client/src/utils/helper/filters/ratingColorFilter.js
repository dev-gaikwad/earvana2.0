const ratingColorFilter = (rating) => {
  if (rating >= 4.5) {
    return 'high-rating';
  } else if (rating >= 3.5) {
    return 'medium-rating';
  } else return 'low-rating';
};

export default ratingColorFilter;
