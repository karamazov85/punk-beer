// export const addToBasket = (item, quantity, basketItems) => {
  
//   if(basketItems[item.id]) {
//     basketItems[item.id].quantity += quantity
//   } else {
//     basketItems[item.id] = item;
//   }

//   return basketItems;
// };

// export const changeBasket = (state, action) => {
//   const { basket } = state;
//   const newBeer = action.payload;

//   if (!basket[newBeer.id]) {
//     return;
//   }

//   basket[newBeer.id].quantity = newBeer.quantity;

//   if (basket[newBeer.id].quantity === 0) {
//     delete basket[newBeer.id];
//   }

//   return {
//     ...state,
//     basket,
//   };
// };

// export const clearFromBasket = (state, action) => {
//   const { basket } = state;
//   const beerToClear = action.payload;

//   if (!basket[beerToClear.id]) {
//     return;
//   }
//   delete basket[beerToClear.id];

//   return {
//     ...state,
//     basket,
//   };
// };

// export const calculateBasketTotal = (basket) => {
//   const subTotal = parseInt(
//     Object.values(basket).reduce((acc, beer) => {
//       return acc + beer.price * beer.quantity;
//     }, 0)
//   );
//   const tax = parseFloat((subTotal * 0.2).toFixed(2));
//   const total = subTotal + tax;

//   return {
//     subTotal,
//     tax,
//     total,
//   };
// };

