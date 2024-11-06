const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables

const address = process.env.POLY_ADDRESS;
const apiKey = process.env.POLY_API_KEY;
const passphrase = process.env.POLY_PASSPHRASE;
const secret = process.env.POLY_SECRET;

// Function to create HMAC signature
function createSignature(address, timestamp, nonce) {
    const message = `${address}${timestamp}${nonce}`;
    return crypto.createHmac('sha256', secret).update(message).digest('hex');
}

// Example API call function
async function getApiKeys() {
    try {
        const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds
        const nonce = process.env.POLY_NONCE || 0; // Use a nonce, it can be a static value for testing
        const signature = createSignature(address, timestamp, nonce);

        const response = await axios.get('https://clob.polymarket.com/auth/derive-api-key', {
            headers: {
                'POLY_ADDRESS': address,
                'POLY_API_KEY': apiKey,
                'POLY_PASSPHRASE': passphrase,
                'POLY_SIGNATURE': signature,
                'POLY_TIMESTAMP': timestamp,
                'POLY_NONCE': nonce
            }
        });

        console.log('API keys fetched successfully:', response.data);
    } catch (error) {
        console.error('Error fetching API keys:', error.response ? error.response.data : error.message);
    }
}

getApiKeys();