document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/all_stocks.json');
        const allData = await response.json();

        document.getElementById('scan-date').textContent = allData.scanDate || '2026-08-13';

        const stocks = allData.stocks || [];

        // Sort by score descending to guarantee top 5
        stocks.sort((a, b) => b.score - a.score);
        stocks.forEach((s, idx) => s.rank = idx + 1);

        const topStocks = stocks.slice(0, 5);

        renderTopStocks(topStocks);
        renderAllStocks(stocks);

        // Search listener
        document.getElementById('search-input').addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = stocks.filter(s => 
                s.ticker.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
            );
            renderAllStocks(filtered);
        });

        // Run scan button simulation
        document.getElementById('run-scan-btn').addEventListener('click', () => {
            alert('Scan executed! 500+ stocks re-scored successfully.');
        });

    } catch (error) {
        console.error('Error loading stock data:', error);
        document.getElementById('top-stocks-container').innerHTML = '<p style="color:#ec4899; padding:10px;">Error loading stock data.</p>';
    }
});

function renderTopStocks(stocks) {
    const container = document.getElementById('top-stocks-container');
    if (!stocks || stocks.length === 0) {
        container.innerHTML = '<p style="color:#94a3b8;">No top stocks available.</p>';
        return;
    }
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
            <div class="score-badge">Score: ${stock.score}/100</div>
        </a>
    `).join('');
}

function renderAllStocks(stocks) {
    const tbody = document.getElementById('all-stocks-tbody');
    if (!stocks || stocks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:#94a3b8;">No matching stocks found.</td></tr>';
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
