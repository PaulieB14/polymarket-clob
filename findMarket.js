const axios = require('axios');

/**
 * Function to find markets based on either a human-readable question or a TokenID/MarketID.
 * @param {string} query - The question (human-readable name) or TokenID/MarketID to search for.
 * @returns {Array|Object} - Array of matching markets or an error message.
 */
async function findMarket(query) {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data.data; // Access the array inside the "data" property

        // Check if the response is an array
        if (!Array.isArray(markets)) {
            console.error("Error: Expected 'markets' to be an array but got:", typeof markets);
            return { error: "Unexpected data format received from Polymarket API" };
        }

        // Determine if the query is a TokenID by its format
        const isTokenID = query.startsWith('0x') && query.length === 66;

        // Search for markets based on a partial match (case-insensitive)
        const matchingMarkets = markets.filter(market =>
            isTokenID
                ? market.condition_id === query
                : market.question.toLowerCase().includes(query.toLowerCase())
        );

        // Return relevant data if markets are found
        if (matchingMarkets.length > 0) {
            return matchingMarkets.map(market => ({
                question: market.question,
                condition_id: market.condition_id,
                market_slug: market.market_slug,
                description: market.description,
                end_date_iso: market.end_date_iso,
                active: market.active,
                closed: market.closed,
                archived: market.archived,
                image: market.image,
                maker_base_fee: market.maker_base_fee,
                taker_base_fee: market.taker_base_fee
            }));
        } else {
            return { error: `Market not found for ${isTokenID ? "TokenID" : "question"}: ${query}` };
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
        return { error: "Error fetching markets" };
    }
}

module.exports = { findMarket };
