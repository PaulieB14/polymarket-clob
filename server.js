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
        console.log("Markets response data:", response.data); // Log the response data for debugging

        // Check if the data structure is as expected (an array)
        if (Array.isArray(response.data)) {
            res.json({ data: response.data }); // Wrap the array in an object to match the expected structure in your front-end
        } else {
            console.error("Unexpected data format:", response.data);
            res.status(500).send("Unexpected data format received from Polymarket API");
        }
    } catch (error) {
        console.error("Error fetching markets:", error);
        res.status(500).send("Error fetching markets");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
