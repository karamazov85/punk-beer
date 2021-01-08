import { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { addPrice, applyCurrency  } from "./search.utils";

export const useFetch = (beerId, initialValue) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(initialValue); 
    useEffect(() => {
        console.log("useEffect FIRES")
        async function fetchBeerById() {
            try {
                const res = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);
                const beer = await res.json();
                setData(beer)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchBeerById()
    },[beerId]);

    return { data: data[0], isLoading }
} 


export const usePriceBeer = beer => {
    const currencyCode = useSelector(state => state.search.currencyCode);
    const [beerWithCurrency, setBeerWithCurrency] = useState(null);

    useEffect(() => {
        const beerPricedInGBP = addPrice(beer)
        const beerWithCurrency = applyCurrency(beerPricedInGBP, currencyCode);
        setBeerWithCurrency(beerWithCurrency) 
    }, [beer])
    return beerWithCurrency;
}