const axios = require('axios');

// Define the target question you're looking for
const targetQuestion = "Will Caroline Ellison be federally charged by March 31?";

async function findMarketByQuestion() {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        console.log("API Response:", response.data);  // Debug: Log the full response

        const markets = response.data;
        console.log("Number of markets fetched:", markets.length);  // Debug: Check number of markets

        // Find the market that matches the target question
        const market = markets.find(market => market.question === targetQuestion);

        if (market) {
            console.log("Market found!");
            console.log("Question:", market.question);
            console.log("Market ID (TokenID):", market.condition_id);
            console.log("Market Slug:", market.market_slug);
        } else {
            console.log("Market not found for question:", targetQuestion);
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
    }
}

findMarketByQuestion();

