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

