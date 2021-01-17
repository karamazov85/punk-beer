import { currencyConverter } from "../../helpers/currencyconverter";

export const addItemToBasket = (basketItems, payload) => {
  
  if (!payload) {
    return;
  }

  const { beer, quantity } = payload;
  const beerCopy = { ...beer } // workaround to overcome object inextensibility - Object.preventExtensions() marks the original beer object as inextensible for some reason

  if (!basketItems[beerCopy.id]) {
    beerCopy.quantity = quantity; // this would not work without above workaround
    basketItems[beerCopy.id] = beerCopy;
  } else {
    basketItems[beerCopy.id].quantity = basketItems[beerCopy.id].quantity + quantity;
  }

  return {
    ...basketItems,
  };
};

export const removeItemFromBasket = (basketItems, payload) => {
  if (!payload) {
    return;
  }
  
  const beerCopy = { ...payload } // workaround to overcome object inextensibility - Object.preventExtensions() marks the original beer/payload object as inextensible for some reason

  if (!basketItems[beerCopy.id]) {
    return;
  }

  basketItems[beerCopy.id].quantity = basketItems[beerCopy.id].quantity - 1;

  if (basketItems[beerCopy.id].quantity === 0) {
    delete basketItems[beerCopy.id];
  }

  return {
    ...basketItems,
  };
};

export const clearItemFromBasket = (basketItems, payload) => {
  if (!payload) {
    return;
  }

  delete basketItems[payload.id];

  return {
    ...basketItems,
  };
};

export const calculateBasketTotal = (basketItems) => {
 
  if (!basketItems) {
    return;
  }

  const subTotal = Object.values(basketItems).reduce((acc, basketItem) => {
    return acc + basketItem.price * basketItem.quantity;
  }, 0);
  const tax = parseFloat((subTotal * 0.2).toFixed(2));
  const total = subTotal + tax;

  return {
    subTotal,
    tax,
    total,
  };
};

export const calculateBasketItemsCount = (basketItems) => {
  if (!basketItems) {
    return;
  }

  return Object.values(basketItems).reduce(
    (acc, basketItem) => acc + basketItem.quantity,
    0
  );
};

export const applyCurrencyToBasket = (basketItems, currencyCode) => {
  
  const beersWithCurrentCurrency_arr = Object.values(basketItems).map(beer => {
    beer.price = currencyConverter(beer.price_GBP, currencyCode)
    return beer;
  });
  
  const beersWithCurrentCurrency_obj = beersWithCurrentCurrency_arr.reduce((obj, curr) => {
    obj[curr.id] = curr;
    return obj
  },{})

  return beersWithCurrentCurrency_obj;
};

const CURRENCY_MAP = {
  GBP: "£",
  USD: "$",
  EUR: "€"
}

export const getCurrencySign = (currencyCode) => {
  return CURRENCY_MAP[currencyCode] || CURRENCY_MAP.GBP;
}

