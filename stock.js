let priceChart = null;
let currentStockData = null;

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticker = urlParams.get('ticker') || 'NVDA';

    try {
        const response = await fetch('data/all_stocks.json');
        const data = await response.json();
        const stock = data.stocks.find(s => s.ticker.toUpperCase() === ticker.toUpperCase());

        if (!stock) {
            document.body.innerHTML = '<div class="container"><h2>Stock not found. <a href="index.html">Return home</a></h2></div>';
            return;
        }

        currentStockData = stock;
        populateDetailView(stock);
        initChart(stock, '1y');

        // Timeframe switch listeners
        document.querySelectorAll('.tf-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                initChart(stock, e.target.getAttribute('data-tf'));
            });
        });

    } catch (error) {
        console.error('Error loading stock detail:', error);
    }
});

function populateDetailView(stock) {
    document.getElementById('stock-ticker').textContent = stock.ticker;
    document.getElementById('stock-name').textContent = stock.name;
    document.getElementById('stock-price').textContent = `$${stock.price.toFixed(2)}`;
    document.getElementById('stock-score-label').textContent = `Investment Score: ${stock.score}/100`;
    document.getElementById('stock-thesis').textContent = stock.thesis;

    document.getElementById('setup-entry').textContent = `$${stock.entryZone}`;
    document.getElementById('setup-target').textContent = `$${stock.targetPrice}`;
    document.getElementById('setup-cutloss').textContent = `$${stock.cutLoss}`;
    document.getElementById('setup-rr').textContent = `1 : ${stock.riskRewardRatio}`;

    const fundList = document.getElementById('fundamentals-list');
    fundList.innerHTML = `
        <div class="metric-item"><div class="metric-label">Intrinsic Value</div><div class="metric-value" style="color: #000; font-weight:700;">$${stock.intrinsicValue}</div></div>
        <div class="metric-item"><div class="metric-label">Economic Moat</div><div class="metric-value">${stock.economicMoat}</div></div>
        <div class="metric-item"><div class="metric-label">P/E Ratio</div><div class="metric-value">${stock.peRatio}</div></div>
        <div class="metric-item"><div class="metric-label">ROE</div><div class="metric-value">${stock.roe}%</div></div>
        <div class="metric-item"><div class="metric-label">Profit Margin</div><div class="metric-value">${stock.profitMargin}%</div></div>
        <div class="metric-item"><div class="metric-label">Debt / Equity</div><div class="metric-value">${stock.debtEquity}</div></div>
        <div class="metric-item"><div class="metric-label">RSI (14)</div><div class="metric-value">${stock.rsi}</div></div>
        <div class="metric-item"><div class="metric-label">Market Cap</div><div class="metric-value">${stock.marketCap}</div></div>
    `;
}

function initChart(stock, timeframe) {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    let labels = [...stock.history.labels];
    let prices = [...stock.history.prices];
    const totalPoints = labels.length;

    // Accurate timeframe slicing based on monthly historical data points
    if (timeframe === '1m') {
        // Last 2 points (latest month-over-month movement)
        labels = labels.slice(Math.max(0, totalPoints - 2));
        prices = prices.slice(Math.max(0, totalPoints - 2));
    } else if (timeframe === '3m') {
        // Last 4 points (approx 3 months)
        labels = labels.slice(Math.max(0, totalPoints - 4));
        prices = prices.slice(Math.max(0, totalPoints - 4));
    } else if (timeframe === '6m') {
        // Last 7 points (approx 6 months)
        labels = labels.slice(Math.max(0, totalPoints - 7));
        prices = prices.slice(Math.max(0, totalPoints - 7));
    }
    // '1y' defaults to full 13 points

    if (priceChart) {
        priceChart.destroy();
    }

    priceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `${stock.ticker} Price ($)`,
                data: prices,
                borderColor: '#000000',
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#f0f0f0' } }
            }
        }
    });
}
