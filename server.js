const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// API route to fetch markets
app.get('/api/markets', async (req, res) => {
    try {
        const response = await axios.get('https://clob.polymarket.com/markets');
        if (response.data && Array.isArray(response.data.data)) {
            res.json(response.data.data); // Send the market data array as JSON
        } else {
            console.error("Unexpected data format:", response.data);
            res.status(500).send("Unexpected data format received from Polymarket API");
        }
    } catch (error) {
        console.error("Error fetching markets:", error.message);
        if (error.response) {
            // Log detailed error response if available
            console.error("Status:", error.response.status);
            console.error("Data:", error.response.data);
            res.status(500).send("Error fetching markets from Polymarket API");
        } else {
            res.status(500).send("Internal Server Error");
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
