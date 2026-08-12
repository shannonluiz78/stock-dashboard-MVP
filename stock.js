const STOCKS_DATABASE = {
    "NVDA": { rank: 1, ticker: "NVDA", name: "NVIDIA Corporation", price: 223.94, targetPrice: 265.00, entryZone: "215.00 - 221.00", cutLoss: 205.00, riskRewardRatio: "2.4 : 1", score: 94, rsi: 58.4, peRatio: 45.2, roe: 54.2, profitMargin: 48.8, debtEquity: 0.12, marketCap: "$5.48T", intrinsicValue: 260.00, economicMoat: "Wide", thesis: "NVIDIA demonstrates elite fundamental momentum driven by accelerated data center AI chip adoption and dominant CUDA ecosystem lock-in.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [180, 192, 175, 195, 205, 215, 200, 210, 225, 210, 218, 212, 223.94] } },
    "MSFT": { rank: 2, ticker: "MSFT", name: "Microsoft Corporation", price: 445.20, targetPrice: 510.00, entryZone: "435.00 - 442.00", cutLoss: 420.00, riskRewardRatio: "2.2 : 1", score: 91, rsi: 54.1, peRatio: 36.2, roe: 38.5, profitMargin: 36.4, debtEquity: 0.35, marketCap: "$3.32T", intrinsicValue: 490.00, economicMoat: "Wide", thesis: "Exceptional cash flow generation paired with enterprise cloud dominance (Azure) and sticky software ecosystems.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [410, 420, 415, 430, 440, 435, 442, 450, 448, 438, 440, 442, 445.2] } },
    "AAPL": { rank: 3, ticker: "AAPL", name: "Apple Inc.", price: 224.30, targetPrice: 255.00, entryZone: "218.00 - 222.00", cutLoss: 210.00, riskRewardRatio: "2.1 : 1", score: 88, rsi: 61.2, peRatio: 34.1, roe: 145.0, profitMargin: 26.5, debtEquity: 1.45, marketCap: "$3.42T", intrinsicValue: 240.00, economicMoat: "Wide", thesis: "Strong share buybacks and robust consumer hardware/services ecosystem stability provide high downside protection.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [212, 218, 215, 220, 225, 222, 219, 224, 228, 221, 220, 222, 224.3] } },
    "GOOGL": { rank: 4, ticker: "GOOGL", name: "Alphabet Inc.", price: 178.90, targetPrice: 210.00, entryZone: "172.00 - 176.00", cutLoss: 165.00, riskRewardRatio: "2.0 : 1", score: 86, rsi: 52.8, peRatio: 25.4, roe: 30.2, profitMargin: 27.8, debtEquity: 0.11, marketCap: "$2.21T", intrinsicValue: 195.00, economicMoat: "Wide", thesis: "Attractive valuation relative to big tech peers with strong digital advertising cash flows and cloud momentum.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [165, 170, 168, 172, 175, 178, 174, 176, 180, 175, 172, 176, 178.9] } },
    "AMZN": { rank: 5, ticker: "AMZN", name: "Amazon.com, Inc.", price: 186.40, targetPrice: 220.00, entryZone: "180.00 - 184.00", cutLoss: 172.00, riskRewardRatio: "2.2 : 1", score: 85, rsi: 49.5, peRatio: 40.8, roe: 22.1, profitMargin: 8.2, debtEquity: 0.52, marketCap: "$1.94T", intrinsicValue: 205.00, economicMoat: "Wide", thesis: "AWS cloud margin expansion and e-commerce operational efficiency gains are driving accelerating free cash flow conversion.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [175, 180, 178, 182, 188, 185, 182, 188, 192, 184, 181, 183, 186.4] } },
    "META": { rank: 6, ticker: "META", name: "Meta Platforms, Inc.", price: 510.50, targetPrice: 580.00, entryZone: "490.00 - 502.00", cutLoss: 465.00, riskRewardRatio: "1.9 : 1", score: 84, rsi: 56.2, peRatio: 26.5, roe: 34.2, profitMargin: 35.1, debtEquity: 0.22, marketCap: "$1.30T", intrinsicValue: 550.00, economicMoat: "Wide", thesis: "Rebound in ad monetization efficiency and disciplined cost management position Meta for strong earnings growth.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [440, 460, 450, 480, 495, 510, 490, 505, 520, 498, 502, 508, 510.5] } },
    "AVGO": { rank: 7, ticker: "AVGO", name: "Broadcom Inc.", price: 165.20, targetPrice: 195.00, entryZone: "158.00 - 162.00", cutLoss: 148.00, riskRewardRatio: "2.1 : 1", score: 82, rsi: 51.9, peRatio: 52.1, roe: 31.5, profitMargin: 28.4, debtEquity: 1.15, marketCap: "$770B", intrinsicValue: 180.00, economicMoat: "Wide", thesis: "Strong custom AI silicon partnership demand and VMware synergy integration driving high margin revenue streams.", history: { labels: ["Aug '25", "Sep", "Oct", "Nov", "Dec", "Jan '26", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], prices: [140, 145, 142, 150, 158, 162, 155, 160, 168, 159, 162, 161, 165.2] } }
};

let priceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticker = (urlParams.get('ticker') || 'NVDA').toUpperCase();

    // Look up stock directly from database, fallback to NVDA if missing
    const stock = STOCKS_DATABASE[ticker] || STOCKS_DATABASE["NVDA"];

    populateDetailView(stock);
    initChart(stock, '1y');

    document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            initChart(stock, e.target.getAttribute('data-tf'));
        });
    });
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
        <div class="metric-item"><div class="metric-label">Intrinsic Value</div><div class="metric-value" style="color: #38bdf8; font-weight:700;">$${stock.intrinsicValue}</div></div>
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

    if (timeframe === '1m') {
        labels = labels.slice(Math.max(0, totalPoints - 2));
        prices = prices.slice(Math.max(0, totalPoints - 2));
    } else if (timeframe === '3m') {
        labels = labels.slice(Math.max(0, totalPoints - 4));
        prices = prices.slice(Math.max(0, totalPoints - 4));
    } else if (timeframe === '6m') {
        labels = labels.slice(Math.max(0, totalPoints - 7));
        prices = prices.slice(Math.max(0, totalPoints - 7));
    }

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
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#ec4899',
                tension: 0.2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
            }
        }
    });
}
