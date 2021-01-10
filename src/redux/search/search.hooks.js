import { useEffect, useState } from "react"; 
import { useSelector } from "react-redux";
import { addPrice, applyCurrency  } from "./search.utils";

export const useFetch = (beerId) => {
    const [isLoading, setLoading] = useState(false);
    const [beer, setBeer] = useState(null); 
    useEffect(() => {
        async function fetchBeerById() {
            try {
                const res = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`);
                const beer = await res.json();
                setBeer(beer[0])
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchBeerById()
    },[beerId]);
    return { beer, isLoading }
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