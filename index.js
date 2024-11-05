async function findMarket(query) {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        const markets = response.data;

        if (!Array.isArray(markets)) {
            throw new TypeError("Expected 'markets' to be an array");
        }

        const isTokenID = query.startsWith('0x') && query.length === 66;
        const market = markets.find(market =>
            isTokenID ? market.condition_id === query : market.question === query
        );

        if (market) {
            return {
                question: market.question,
                condition_id: market.condition_id,
                market_slug: market.market_slug
            };
        } else {
            return { error: `Market not found for ${isTokenID ? "TokenID" : "question"}: ${query}` };
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
        throw error;  // Let index.js handle the error response
    }
}
