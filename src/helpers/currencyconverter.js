export const currencyConverter = (price_GBP, newCurrency) => {
  
  let converted = 0;

  const rates = {
    "GBP-to-USD": 1.2,
    "GBP-to-EUR": 1.1,
  };

  if (newCurrency === "GBP") {
    converted = price_GBP;
  }

  if (newCurrency === "USD") {
    converted = price_GBP * rates["GBP-to-USD"];
  } else if (newCurrency === "EUR") {
    converted = price_GBP * rates["GBP-to-EUR"];
  }
  return parseFloat(converted.toFixed(1));
};


// export const currencyConverter = (amount, prevCurrency, newCurrency) => {
//   debugger;
//   let converted = 0;

//   const rates = {
//     "GBP-to-USD": 1.2,
//     "USD-to-GBP": 0.77,
//     "GBP-to-EUR": 1.1,
//     "EUR-to-GBP": 0.9,
//     "USD-to-EUR": 0.85,
//     "EUR-to-USD": 1.17,
//   };

//   if (prevCurrency === newCurrency) {
//     return amount;
//   }

//   if (prevCurrency === "GBP" && newCurrency === "USD") {
//     converted = amount * rates["GBP-to-USD"];
//   } else if (prevCurrency === "USD" && newCurrency === "GBP") {
//     converted = amount * rates["USD-to-GBP"];
//   } else if (prevCurrency=== "GBP" && newCurrency === "EUR") {
//     converted = amount * rates["GBP-to-EUR"];
//   } else if (prevCurrency === "EUR" && newCurrency === "GBP") {
//     converted = amount * rates["EUR-to-GBP"];
//   } else if (prevCurrency=== "EUR" && newCurrency === "USD") {
//     converted = amount * rates["EUR-to-USD"];
//   } else if (prevCurrency === "USD" && newCurrency === "EUR") {
//     converted = amount * rates["USD-to-EUR"];
//   }

//   return parseFloat(converted.toFixed(1));
// };
