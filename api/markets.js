const axios = require('axios');

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' });
        return;
    }

    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        if (response.data && Array.isArray(response.data.data)) {
            res.status(200).json(response.data.data); // Send the market data array as JSON
        } else {
            console.error("Unexpected data format:", response.data);
            res.status(500).send("Unexpected data format received from Polymarket API");
        }
    } catch (error) {
        console.error("Error fetching markets:", error.message);
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            res.status(500).send("Error fetching markets from Polymarket API");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
}
