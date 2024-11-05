document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    try {
        const result = await findMarket(query);
        displayMarket(result);
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

function displayMarket(market) {
    const container = document.getElementById('results-container');
    container.innerHTML = ''; // Clear previous results

    if (market.error) {
        container.innerHTML = `<p>${market.error}</p>`;
    } else {
        container.innerHTML = `
            <h3>${market.question}</h3>
            <p><strong>Market ID (TokenID):</strong> ${market.condition_id}</p>
            <p><strong>Market Slug:</strong> ${market.market_slug}</p>
        `;
    }
}
