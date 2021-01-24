import { useEffect, useState } from "react"; 

export const useFetch = (beerId) => {
    const [isLoading, setLoading] = useState(false);
    const [beer, setBeer] = useState(null); 
    useEffect(() => {
        
        // use the fetch API's built-in abort controller object to prevent race conditions
        const abortCtrl = new AbortController();
        const opts = { signal: abortCtrl.signal}

        async function fetchBeerById() {
            try {
                const res = await fetch(`https://api.punkapi.com/v2/beers/${beerId}`, opts);
                const beer = await res.json();
                setBeer(beer[0])
            } catch (err) {
                if (err == 'AbortError') {
                    console.log('The request has been cancelled')
                } 
            } finally {
                setLoading(false)
            }
        }
        fetchBeerById()
        // cleanup with AbortCtrl
        return () => abortCtrl.abort();
    },[beerId]);
    return { beer, isLoading }
} 

