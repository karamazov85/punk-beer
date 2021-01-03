const fs = require("fs");
const fetch = require("node-fetch");

async function loadBeers() {
 const beerRequests = new Array(5)
    .fill(null)
    .map((_, i) =>
      fetch(`https://api.punkapi.com/v2/beers?page=${i + 1}&per_page=80`)
    );

  const beerResponses = await Promise.all(beerRequests).catch((err) =>
    console.log(err)
  );
  const parsedBeers = await parseBeerResponses(beerResponses); // here, we get an array of 5 arrays inside
  const allBeers = await parsedBeers.reduce((acc, curr) => acc.concat(curr), []);
  console.log(allBeers)
  fs.writeFileSync("./src/beersTemp.json", JSON.stringify(allBeers));
  return; 
}

function parseBeerResponses(beerResponses) {
  return Promise.all(beerResponses.map((res) => res.json())).catch((err) =>
    console.log(err)
  );
}

loadBeers();
