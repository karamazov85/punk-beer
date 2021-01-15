import { createSlice } from "@reduxjs/toolkit";
import { addItemToBasket, removeItemFromBasket, clearItemFromBasket, calculateBasketTotal, applyCurrencyToBasket, getCurrencySign, calculateBasketItemsCount  } from "./basket.utils.js"

export const slice = createSlice({
    name: "basket",
    initialState: {
        basketItems: {},
        basketTotal: { subTotal: 0, tax: 0, total: 0 },
        currencyCode: "GBP",
        currencySign: "£",
        basketItemsCount: 0,
    },
    reducers: {
        addToBasket: (state, action) => {
            const newBasketItems = addItemToBasket(state.basketItems, action.payload);
            state.basketItems = newBasketItems;
        },
        removeFromBasket: (state, action) => {
            const newBasketItems = removeItemFromBasket(state.basketItems, action.payload);
            state.basketItems = newBasketItems;
        },
        clearFromBasket : (state, action) => {
            const newBasketItems = clearItemFromBasket(state.basketItems, action.payload);
            state.basketItems = newBasketItems;
        },
        setBasketTotal: state => {
            const newBasketTotal = calculateBasketTotal(state.basketItems); 
            state.basketTotal = newBasketTotal;
        },
        setPricesInNewCurrencyInBasket: (state, action) => {
            const beersInNewCurrency = applyCurrencyToBasket(state.basketItems, action.payload);
            state.basketItems = beersInNewCurrency;
        },
        setNewCurrencySignInBasket: (state, action) => {
            const newCurrencySign = getCurrencySign(action.payload); 
            state.currencySign = newCurrencySign;
        },
        setNewCurrencyCodeInBasket: (state, action) => {
            const newCurrencyCode = action.payload;
            state.currencyCode = newCurrencyCode;
        },
        setBasketItemsCount: state => {
            const newBasketItemsCount = calculateBasketItemsCount(state.basketItems);
            state.basketItemsCount = newBasketItemsCount;
        }
    }
})

export const { addToBasket, removeFromBasket, setBasketTotal, clearFromBasket, setPricesInNewCurrencyInBasket, setNewCurrencySignInBasket, setNewCurrencyCodeInBasket, setBasketItemsCount } = slice.actions;

export default slice.reducer;