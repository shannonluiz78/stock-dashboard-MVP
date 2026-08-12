document.addEventListener('DOMContentLoaded', async () => {
    try {
        const topResponse = await fetch('data/top_stocks.json');
        const topStocks = await topResponse.json();

        const allResponse = await fetch('data/all_stocks.json');
        const allData = await allResponse.json();

        document.getElementById('scan-date').textContent = allData.scanDate || 'Unknown';

        renderTopStocks(topStocks);
        renderAllStocks(allData.stocks);

        // Search listener
        document.getElementById('search-input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allData.stocks.filter(s => 
                s.ticker.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
            );
            renderAllStocks(filtered);
        });

        // Run scan button simulation
        document.getElementById('run-scan-btn').addEventListener('click', () => {
            alert('Scan requested! In production with GitHub Actions, this triggers a workflow dispatch or live data fetch cycle.');
        });

    } catch (error) {
        console.error('Error loading stock data:', error);
        document.getElementById('top-stocks-container').innerHTML = '<p>Error loading data. Please ensure JSON files are generated.</p>';
    }
});

function renderTopStocks(stocks) {
    const container = document.getElementById('top-stocks-container');
    container.innerHTML = stocks.map(stock => `
        <a href="stock.html?ticker=${stock.ticker}" class="stock-card">
            <div class="card-header">
                <span class="ticker">${stock.ticker}</span>
                <span class="rank">#${stock.rank}</span>
            </div>
            <div class="company-name">${stock.name}</div>
            <div class="card-metrics">
                <div>
                    <div class="metric-label">Price</div>
                    <div class="metric-value">$${stock.price.toFixed(2)}</div>
                </div>
                <div>
                    <div class="metric-label">Target</div>
                    <div class="metric-value">$${stock.targetPrice.toFixed(2)}</div>
                </div>
            </div>
            <div class="score-badge">Investment Score: ${stock.score}/100</div>
        </a>
    `).join('');
}

function renderAllStocks(stocks) {
    const tbody = document.getElementById('all-stocks-tbody');
    if (stocks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:#666;">No matching stocks found.</td></tr>';
        return;
    }
    tbody.innerHTML = stocks.map(stock => `
        <tr onclick="window.location.href='stock.html?ticker=${stock.ticker}'">
            <td>#${stock.rank || '-'}</td>
            <td><strong>${stock.ticker}</strong></td>
            <td>${stock.name}</td>
            <td>$${stock.price.toFixed(2)}</td>
            <td><strong>${stock.score}</strong></td>
            <td>${stock.rsi}</td>
            <td>$${stock.entryZone}</td>
            <td>$${stock.targetPrice}</td>
        </tr>
    `).join('');
}
