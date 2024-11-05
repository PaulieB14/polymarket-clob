const axios = require('axios');

/**
 * Function to find a market based on either a human-readable question or a TokenID/MarketID.
 * @param {string} query - The question (human-readable name) or TokenID/MarketID to search for.
 */
async function findMarket(query) {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data;

        // Check if the query looks like a TokenID (assumes a TokenID is a long hex string)
        const isTokenID = query.startsWith('0x') && query.length === 66;

        // Search for the market based on either question or condition_id
        const market = markets.find(market =>
            isTokenID ? market.condition_id === query : market.question === query
        );

        if (market) {
            console.log("Market found!");
            console.log("Question:", market.question);
            console.log("Market ID (TokenID):", market.condition_id);
            console.log("Market Slug:", market.market_slug);
        } else {
            console.log(`Market not found for ${isTokenID ? "TokenID" : "question"}:`, query);
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
    }
}

// Export the function so it can be used in other files
module.exports = findMarket;
