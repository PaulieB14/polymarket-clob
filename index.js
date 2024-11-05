const findMarket = require('./findMarket');

// Example queries
const questionQuery = "Will Caroline Ellison be federally charged by March 31?";
const tokenIDQuery = "0x4438202b145817f30fa3ee9ac5ab73a6160ec04ec5918bd843775f3b65b3cb47";

// Run the function with a question
console.log("Searching by question:");
findMarket(questionQuery);

// Run the function with a TokenID
console.log("\nSearching by TokenID:");
findMarket(tokenIDQuery);
