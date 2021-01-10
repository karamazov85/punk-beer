import { currencyConverter } from "../helpers/currencyconverter";

export const addItemToBasket = (item, quantity, basketItems) => {

  if (!item) {
    return;
  }

  if (!basketItems[item.id]) {
    item.quantity = quantity;
    basketItems[item.id] = item;
  } else {
    basketItems[item.id].quantity = basketItems[item.id].quantity + quantity;
  }

  return {
    ...basketItems,
  };
};

export const removeItemFromBasket = (item, basketItems) => {
  if (!item) {
    return;
  }

  if (!basketItems[item.id]) {
    return;
  }

  basketItems[item.id].quantity = basketItems[item.id].quantity - 1;

  if (basketItems[item.id].quantity === 0) {
    delete basketItems[item.id];
  }

  return {
    ...basketItems,
  };
};

export const clearItemFromBasket = (item, basketItems) => {
  if (!item) {
    return;
  }

  delete basketItems[item.id];

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

export const changeCurrencyForCountry = (country) => {
  switch (country) {
    case "UK":
      return "GBP";
      break;
    case "USA":
      return "USD";
      break;
    case "Germany":
      return "EUR";
      break;
    default:
      return "GBP";
      break;
  }
};

export const changeCurrencySignForCountry = (country) => {
  switch (country) {
    case "UK":
      return "£";
      break;
    case "USA":
      return "$";
      break;
    case "Germany":
      return "€";
      break;
    default:
      return "£";
      break;
  }
};

// export const calculateBasketItemsWithCurrentCurrency = (basketItems, prev_currency_code, current_currency_code) => {
//   const beerArr = Object.entries(basketItems).map(([key, beer]) => {
//     beer.price = currencyConverter(beer.price, prev_currency_code, current_currency_code);
//     return beer;
//   })

//   const basketItemsConverted = beerArr.reduce((acc, currBeer) => {
//     acc[currBeer[0]] = currBeer[1]
//     return acc;
//   },{});
//   console.log(basketItemsConverted);
//   return basketItemsConverted; 
// }

// export const calculateBasketTotalWithCurrentCurrency = (
//   basketTotal,
//   prev_currency_code,
//   current_currency_code
// ) => {
//   const subTotal = parseFloat(
//     currencyConverter(
//       basketTotal.subTotal,
//       prev_currency_code,
//       current_currency_code
//     ).toFixed(2)
//   );
//   const tax = parseFloat(
//     currencyConverter(
//       basketTotal.tax,
//       prev_currency_code,
//       current_currency_code
//     ).toFixed(2)
//   );
//   const total = parseFloat(
//     currencyConverter(
//       basketTotal.total,
//       prev_currency_code,
//       current_currency_code
//     ).toFixed(2)
//   );

//   return {
//     subTotal,
//     tax,
//     total,
//   };
// };