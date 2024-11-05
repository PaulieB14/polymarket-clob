const axios = require('axios');

async function findMarketByQuestion() {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data;

        console.log("Total markets fetched:", markets.length);

        // Loop through each market and display relevant information
        markets.forEach((market) => {
            console.log("Question:", market.question);
            console.log("Market ID (TokenID):", market.condition_id);
            console.log("Market Slug:", market.market_slug);
            console.log("------");
        });
    } catch (error) {
        console.error("Error fetching markets:", error);
    }
}

findMarketByQuestion();
