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

export const getCurrencySign = (currencyCode) => {
  switch (currencyCode) {
    case "GBP":
      return "£";
      break;
    case "USD":
      return "$";
      break;
    case "EUR":
      return "€";
      break;
    default:
      return "£";
      break;
  }
}

// export const changeCurrencyForCountry = (country) => {
//   switch (country) {
//     case "UK":
//       return "GBP";
//       break;
//     case "USA":
//       return "USD";
//       break;
//     case "Germany":
//       return "EUR";
//       break;
//     default:
//       return "GBP";
//       break;
//   }
// };

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
