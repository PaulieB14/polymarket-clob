const axios = require('axios');
const { ethers } = require('ethers');
require('dotenv').config(); // Load environment variables

const address = process.env.POLY_ADDRESS;
const privateKey = process.env.POLY_PRIVATE_KEY; // Add your private key to the .env file
const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com'); // Polygon RPC provider
const wallet = new ethers.Wallet(privateKey, provider);

// Function to create EIP-712 signature
async function createSignature(address, timestamp, nonce) {
    const domain = {
        name: "ClobAuthDomain",
        version: "1",
        chainId: 137, // Polygon ChainID
    };

    const types = {
        ClobAuth: [
            { name: "address", type: "address" },
            { name: "timestamp", type: "string" },
            { name: "nonce", type: "uint256" },
            { name: "message", type: "string" },
        ],
    };

    const value = {
        address: address,
        timestamp: timestamp.toString(),
        nonce: nonce,
        message: "This message attests that I control the given wallet",
    };

    const signature = await wallet._signTypedData(domain, types, value);
    return signature;
}

// Function to create API key
async function createApiKey() {
    try {
        const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds
        const nonce = 0; // Use a nonce, it can be a static value for testing
        const signature = await createSignature(address, timestamp, nonce);

        const response = await axios.post('https://clob.polymarket.com/auth/api-key', {}, {
            headers: {
                'POLY_ADDRESS': address,
                'POLY_SIGNATURE': signature,
                'POLY_TIMESTAMP': timestamp,
                'POLY_NONCE': nonce
            }
        });

        console.log('API key created successfully:', response.data);
    } catch (error) {
        console.error('Error creating API key:', error.response ? error.response.data : error.message);
    }
}

createApiKey();