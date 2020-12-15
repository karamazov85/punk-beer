// search
export const setSearchStateInLS = (searchState) => {
  
  clearSearchStateInLS();
  localStorage.setItem("searchState", JSON.stringify(searchState));
};

export const getSearchStateFromLS = () => {
  const searchStateInLS = localStorage.getItem("searchState");
  const searchState = searchStateInLS ? JSON.parse(searchStateInLS) : {};
  return searchState;
};
export const clearSearchStateInLS = () =>
  localStorage.setItem("searchState", JSON.stringify({}));

// basket
export const setBasketInLS = (basketItems, basketTotal, basketItemsCount) => {
  clearBasketInLS();
  localStorage.setItem(
    "basket",
    JSON.stringify({ basketItems, basketTotal, basketItemsCount })
  );
};

export const clearBasketInLS = () => {
  localStorage.setItem("basket", JSON.stringify([]));
};

export const getBasketFromLS = () => {
  const basketInLS = localStorage.getItem("basket");
  const basket = basketInLS ? JSON.parse(basketInLS) : {};

  return basket;
};
