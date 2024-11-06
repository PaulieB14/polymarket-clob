import { JsonRpcProvider, Wallet } from 'ethers';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const address = process.env.POLY_ADDRESS;
const privateKey = process.env.POLY_PRIVATE_KEY;
const mnemonic = process.env.POLY_SECRET;

// Validate that variables are loaded correctly
if (!address || !privateKey || !mnemonic) {
    console.error("Error: One or more required environment variables are missing.");
    process.exit(1);
}

const provider = new JsonRpcProvider('https://polygon-rpc.com'); // Polygon RPC provider
const wallet = new Wallet(privateKey, provider);

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

    try {
        const signature = await wallet.signTypedData(domain, types, value); // Updated for ethers v6
        console.log('Generated Signature:', signature);
        return signature;
    } catch (error) {
        console.error('Error creating signature:', error.message);
        throw error; // Re-throw to be caught in the calling function
    }
}

// Function to create API key
async function createApiKey() {
    try {
        const timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds
        const nonce = Math.floor(Math.random() * 1000); // Random nonce for testing to avoid reuse issues
        console.log('Using timestamp:', timestamp);
        console.log('Using nonce:', nonce);

        const signature = await createSignature(address, timestamp, nonce);

        // Log headers for debugging purposes
        const headers = {
            'POLY_ADDRESS': address,
            'POLY_SIGNATURE': signature,
            'POLY_TIMESTAMP': timestamp,
            'POLY_NONCE': nonce
        };
        console.log('Request Headers:', headers);

        const response = await axios.post('https://clob.polymarket.com/auth/api-key', {}, { headers });

        console.log('API key created successfully:', response.data);
    } catch (error) {
        console.error('Error creating API key:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
        }
    }
}

createApiKey();
