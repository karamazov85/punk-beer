import { createSlice } from "@reduxjs/toolkit";
import { addItemToBasket, removeItemFromBasket, calculateBasketTotal  } from "./basket.utils.js"
import { subscribe } from "redux-subscriber";

export const slice = createSlice({
    name: "basket",
    initialState: {
        basketItems: {},
        basketTotal: { subTotal: 0, tax: 0, total: 0 },
        currencySign: "£",
        test: null
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
        setBasketTotal: state => {
            const newBasketTotal = calculateBasketTotal(state.basketItems); 
            state.basketTotal = newBasketTotal;
        }
    }
})

export const { addToBasket, removeFromBasket, setTest, setBasketTotal } = slice.actions;

export const updateBasketTotals = () => (dispatch, getState) => { // order or parameters is CRUCIAL. dipsatch first, getState() second!!!
    const basketItems = getState().basket.basketItems;
    console.log(basketItems)
    dispatch(setBasketTotal())
}

export default slice.reducer;