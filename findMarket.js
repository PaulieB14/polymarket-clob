const axios = require('axios');

/**
 * Function to find a market based on either a human-readable question or a TokenID/MarketID.
 * @param {string} query - The question (human-readable name) or TokenID/MarketID to search for.
 */
async function findMarket(query) {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data;

        // Determine if the query is likely a TokenID by its format
        const isTokenID = query.startsWith('0x') && query.length === 66;

        // Search for the market based on either the question or condition_id
        const market = markets.find(market =>
            isTokenID ? market.condition_id === query : market.question === query
        );

        // Output only relevant data if market is found
        if (market) {
            console.log("Market found:");
            console.log("Question:", market.question);
            console.log("Market ID (TokenID):", market.condition_id);
            console.log("Market Slug:", market.market_slug);
        } else {
            console.log(`Market not found for ${isTokenID ? "TokenID" : "question"}: ${query}`);
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
    }
}

// Export the function to be used in index.js
module.exports = findMarket;
