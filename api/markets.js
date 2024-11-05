const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const address = process.env.POLY_ADDRESS;
const apiKey = process.env.POLY_API_KEY;
const passphrase = process.env.POLY_PASSPHRASE;
const secret = process.env.POLY_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send({ message: 'Only GET requests allowed' });
    }

    try {
        const response = await axios.get('https://clob.polymarket.com/markets', {
            headers: {
                'POLY_ADDRESS': address,
                'POLY_API_KEY': apiKey,
                'POLY_PASSPHRASE': passphrase,
                // Add other headers if necessary
            }
        });

        if (response.data && Array.isArray(response.data.data)) {
            return res.status(200).json(response.data.data); // Send the market data array as JSON
        } else {
            console.error("Unexpected data format:", response.data);
            return res.status(500).send("Unexpected data format received from Polymarket API");
        }
    } catch (error) {
        console.error("Error fetching markets:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            return res.status(500).send("Error fetching markets from Polymarket API");
        } else {
            return res.status(500).send("Internal Server Error");
        }
    }
}
