const axios = require('axios');

/**
 * Function to find markets based on either a human-readable question or a TokenID/MarketID.
 * @param {string} query - The question (human-readable name) or TokenID/MarketID to search for.
 */
async function findMarket(query) {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data.data; // Access the array inside the "data" property

        console.log("Response data:", markets); // Log the response data

        // Check if the response is an array
        if (!Array.isArray(markets)) {
            console.error("Error: Expected 'markets' to be an array but got:", typeof markets);
            return;
        }

        // Determine if the query is a TokenID by its format
        const isTokenID = query.startsWith('0x') && query.length === 66;

        // Search for markets based on a partial match (case-insensitive)
        const matchingMarkets = markets.filter(market =>
            isTokenID
                ? market.condition_id === query
                : market.question.toLowerCase().includes(query.toLowerCase())
        );

        // Output relevant data if markets are found
        if (matchingMarkets.length > 0) {
            matchingMarkets.forEach(market => {
                console.log("Market found:");
                console.log("Question:", market.question);
                console.log("Market ID (TokenID):", market.condition_id);
                console.log("Market Slug:", market.market_slug);
            });
        } else {
            console.log(`Market not found for ${isTokenID ? "TokenID" : "question"}: ${query}`);
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code not in the range of 2xx
            console.error("Server responded with an error:", error.response.status);
            console.error("Response data:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Error setting up request:", error.message);
        }
    }
}

module.exports = { findMarket };
