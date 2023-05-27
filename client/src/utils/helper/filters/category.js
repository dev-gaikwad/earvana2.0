const filterCategoryWiseProducts = (products, categories) => {
  let filteredByCategory;
  let filteredByType;
  if (categories.length) {
    if (categories.includes('in_ear') && categories.includes('over_ear')) {
      filteredByCategory = products;
    } else if (categories.includes('in_ear')) {
      filteredByCategory = products.filter((product) => product.in_ear);
    } else if (categories.includes('over_ear')) {
      filteredByCategory = products.filter((product) => !product.in_ear);
    } else {
      filteredByCategory = products;
    }

    if (categories.includes('wired') && categories.includes('wireless')) {
      filteredByType = filteredByCategory;
    } else if (categories.includes('wired')) {
      filteredByType = filteredByCategory.filter((product) => product.wired);
    } else if (categories.includes('wireless')) {
      filteredByType = filteredByCategory.filter((product) => !product.wired);
    } else {
      filteredByType = filteredByCategory;
    }

    return filteredByType;
  } else {
    return products;
  }
};

export default filterCategoryWiseProducts;
