import React, { createContext, useState, useEffect } from "react";
import {
  calculateBasketTotal,
  addItemToBasket,
  removeItemFromBasket,
  clearItemFromBasket,
  calculateBasketItemsCount,
  changeCurrencyForCountry,
  changeCurrencySignForCountry,
} from "./basket.utils";

export const BasketContext = createContext({
  basketItems: {},
  addToBasket: () => {},
  basketTotal: { subTotal: 0, tax: 0, total: 0 },
  setBasketTotal: () => {},
  basketItemsCount: 0,
  setBasketItemsCount: () => {},
  previewHidden: true,
  setPreviewHidden: () => {},
  prevCurrencyCode: "GBP",
  setPrevCurrencyCode: () => {},
  currencyCode: "GBP",
  currency_sign: "£",
  setCurrencyCode: () => {},
  setCurrencySign: () => {},
});

const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState({});
  const [basketTotal, setBasketTotal] = useState({
    subTotal: 0,
    tax: 0,
    total: 0,
  });
  const [basketItemsCount, setBasketItemsCount] = useState(0);
  const [previewHidden, setPreviewHidden] = useState(true);
  // const [prevCurencyCode, setPrevCurrencyCode] = useState("GBP");
  const [currencyCode, setCurrencyCode] = useState("GBP");
  const [currencySign, setCurrencySign] = useState("£");

  const addToBasket = (item, quantity) =>
    setBasketItems(addItemToBasket(item, quantity, basketItems));

  const removeFromBasket = (item) =>
    setBasketItems(removeItemFromBasket(item, basketItems));

  const clearFromBasket = (item) =>
    setBasketItems(clearItemFromBasket(item, basketItems));

  const toggleHidden = () => setPreviewHidden(!previewHidden);

  const changeCurrencyForBasket = (country) => {
    // setPrevCurrencyCode(currencyCode);
    setCurrencyCode(changeCurrencyForCountry(country));
    setCurrencySign(changeCurrencySignForCountry(country));
  };

  useEffect(() => {
    setBasketTotal(calculateBasketTotal(basketItems));
    setBasketItemsCount(calculateBasketItemsCount(basketItems));
  }, [basketItems]);

  useEffect(() => {
    setBasketTotal(calculateBasketTotal(basketItems));
  }, [currencyCode]);

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        basketTotal,
        removeFromBasket,
        clearFromBasket,
        basketItemsCount,
        previewHidden,
        toggleHidden,
        currencyCode,
        changeCurrencyForBasket,
        currencySign,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketProvider;
