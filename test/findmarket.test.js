const { findMarket } = require('../findMarket');
const assert = require('assert');

describe('findMarket', function() {
    it('should find a market by question', async function() {
        const query = "some question";
        const result = await findMarket(query);
        assert(result, "Market should be found");
    });

    it('should find a market by TokenID', async function() {
        const query = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
        const result = await findMarket(query);
        assert(result, "Market should be found");
    });
});