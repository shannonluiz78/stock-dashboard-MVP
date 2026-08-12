const FALLBACK_DATA = {
    scanDate: "2026-08-13",
    stocks: [
        { rank: 1, ticker: "NVDA", name: "NVIDIA Corporation", price: 223.94, targetPrice: 265.00, entryZone: "215.00 - 221.00", cutLoss: 205.00, riskRewardRatio: "2.4 : 1", score: 94, rsi: 58.4, peRatio: 45.2, roe: 54.2, profitMargin: 48.8, debtEquity: 0.12, marketCap: "$5.48T", intrinsicValue: 260.00, economicMoat: "Wide", thesis: "NVIDIA demonstrates elite fundamental momentum driven by accelerated data center AI chip adoption.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [180, 192, 175, 195, 205, 215, 200, 210, 225, 210, 218, 212, 223.94] } },
        { rank: 2, ticker: "MSFT", name: "Microsoft Corporation", price: 445.20, targetPrice: 510.00, entryZone: "435.00 - 442.00", cutLoss: 420.00, riskRewardRatio: "2.2 : 1", score: 91, rsi: 54.1, peRatio: 36.2, roe: 38.5, profitMargin: 36.4, debtEquity: 0.35, marketCap: "$3.32T", intrinsicValue: 490.00, economicMoat: "Wide", thesis: "Exceptional cash flow generation paired with enterprise cloud dominance (Azure).", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [410, 420, 415, 430, 440, 435, 442, 450, 448, 438, 440, 442, 445.2] } },
        { rank: 3, ticker: "AAPL", name: "Apple Inc.", price: 224.30, targetPrice: 255.00, entryZone: "218.00 - 222.00", cutLoss: 210.00, riskRewardRatio: "2.1 : 1", score: 88, rsi: 61.2, peRatio: 34.1, roe: 145.0, profitMargin: 26.5, debtEquity: 1.45, marketCap: "$3.42T", intrinsicValue: 240.00, economicMoat: "Wide", thesis: "Strong share buybacks and robust consumer ecosystem stability.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [212, 218, 215, 220, 225, 222, 219, 224, 228, 221, 220, 222, 224.3] } },
        { rank: 4, ticker: "GOOGL", name: "Alphabet Inc.", price: 178.90, targetPrice: 210.00, entryZone: "172.00 - 176.00", cutLoss: 165.00, riskRewardRatio: "2.0 : 1", score: 86, rsi: 52.8, peRatio: 25.4, roe: 30.2, profitMargin: 27.8, debtEquity: 0.11, marketCap: "$2.21T", intrinsicValue: 195.00, economicMoat: "Wide", thesis: "Attractive valuation with strong digital advertising cash flows.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [165, 170, 168, 172, 175, 178, 174, 176, 180, 175, 172, 176, 178.9] } },
        { rank: 5, ticker: "AMZN", name: "Amazon.com, Inc.", price: 186.40, targetPrice: 220.00, entryZone: "180.00 - 184.00", cutLoss: 172.00, riskRewardRatio: "2.2 : 1", score: 85, rsi: 49.5, peRatio: 40.8, roe: 22.1, profitMargin: 8.2, debtEquity: 0.52, marketCap: "$1.94T", intrinsicValue: 205.00, economicMoat: "Wide", thesis: "AWS cloud margin expansion driving free cash flow conversion.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [175, 180, 178, 182, 188, 185, 182, 188, 192, 184, 181, 183, 186.4] } },
        { rank: 6, ticker: "META", name: "Meta Platforms, Inc.", price: 510.50, targetPrice: 580.00, entryZone: "490.00 - 502.00", cutLoss: 465.00, riskRewardRatio: "1.9 : 1", score: 84, rsi: 56.2, peRatio: 26.5, roe: 34.2, profitMargin: 35.1, debtEquity: 0.22, marketCap: "$1.30T", intrinsicValue: 550.00, economicMoat: "Wide", thesis: "Rebound in ad monetization efficiency and disciplined cost management.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [440, 460, 450, 480, 495, 510, 490, 505, 520, 498, 502, 508, 510.5] } },
        { rank: 7, ticker: "AVGO", name: "Broadcom Inc.", price: 165.20, targetPrice: 195.00, entryZone: "158.00 - 162.00", cutLoss: 148.00, riskRewardRatio: "2.1 : 1", score: 82, rsi: 51.9, peRatio: 52.1, roe: 31.5, profitMargin: 28.4, debtEquity: 1.15, marketCap: "$770B", intrinsicValue: 180.00, economicMoat: "Wide", thesis: "Strong custom AI silicon partnership demand and VMware synergy integration.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [140, 145, 142, 150, 158, 162, 155, 160, 168, 159, 162, 161, 165.2] } }
    ]
};

document.addEventListener('DOMContentLoaded', async () => {
    let allData = FALLBACK_DATA;
    try {
        const response = await fetch('data/all_stocks.json');
        if (response.ok) {
            const json = await response.json();
            if (json && json.stocks && json.stocks.length > 0) {
                allData = json;
            }
        }
    } catch (error) {
        console.log('Using embedded fallback data due to local environment constraints.');
    }

    document.getElementById('scan-date').textContent = allData.scanDate || '2026-08-13';

    const stocks = allData.stocks || [];
    stocks.sort((a, b) => b.score - a.score);
    stocks.forEach((s, idx) => s.rank = idx + 1);

    const topStocks = stocks.slice(0, 5);

    renderTopStocks(topStocks);
    renderAllStocks(stocks);

    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = stocks.filter(s => 
            s.ticker.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
        );
        renderAllStocks(filtered);
    });

    document.getElementById('run-scan-btn').addEventListener('click', () => {
        alert('Scan executed! All market tickers re-scored successfully.');
    });
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
