// server.js
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
        res.json(response.data); // Send the market data as JSON
    } catch (error) {
        console.error("Error fetching markets:", error);
        res.status(500).send("Error fetching markets");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
