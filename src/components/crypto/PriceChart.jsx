import { formatCurrency, formatPercent } from '../../data';

/**
 * CDS-styled PriceChart component
 * Matches Coinbase asset detail chart style
 */
const PriceChart = ({ crypto, timeframe = '1D', onTimeframeChange }) => {
  const isPositive = crypto.change24h >= 0;
  
  // Generate more detailed mock data for the chart based on timeframe
  const generateChartData = () => {
    const basePrice = crypto.price;
    const volatility = crypto.price * 0.02;
    const points = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 365;
    
    return Array.from({ length: points }, (_, i) => {
      const variance = (Math.random() - 0.5) * volatility;
      const trend = isPositive ? (i / points) * volatility * 0.5 : -(i / points) * volatility * 0.5;
      return basePrice - volatility + variance + trend;
    });
  };

  const chartData = generateChartData();
  const minPrice = Math.min(...chartData);
  const maxPrice = Math.max(...chartData);
  const priceRange = maxPrice - minPrice || 1;

  // Generate SVG path
  const pathPoints = chartData.map((price, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - ((price - minPrice) / priceRange) * 90;
    return `${x},${y}`;
  }).join(' ');

  // Generate area path
  const areaPath = `M0,100 L0,${100 - ((chartData[0] - minPrice) / priceRange) * 90} ${chartData.map((price, i) => {
    const x = (i / (chartData.length - 1)) * 100;
    const y = 100 - ((price - minPrice) / priceRange) * 90;
    return `L${x},${y}`;
  }).join(' ')} L100,100 Z`;

  const timeframes = ['1H', '1D', '1W', '1M', '1Y', 'ALL'];

  return (
    <div className="cds-card p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <div className="cds-avatar cds-avatar-xl">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="cds-title-1 text-fg">{crypto.name}</h2>
            <p className="cds-label-2 text-fg-muted">{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="cds-display-3 text-fg tabular-nums">
            {formatCurrency(crypto.price)}
          </div>
          <span className={`cds-label-1 ${isPositive ? 'text-fg-positive' : 'text-fg-negative'}`}>
            {isPositive ? '↑' : '↓'} {formatPercent(Math.abs(crypto.change24h))} today
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`chart-gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={isPositive ? 'var(--cds-green-60)' : 'var(--cds-red-60)'}
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? 'var(--cds-green-60)' : 'var(--cds-red-60)'}
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Area fill */}
          <path
            d={areaPath}
            fill={`url(#chart-gradient-${crypto.id})`}
          />

          {/* Line */}
          <polyline
            fill="none"
            stroke={isPositive ? 'var(--cds-green-60)' : 'var(--cds-red-60)'}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pathPoints}
          />
        </svg>
      </div>

      {/* Timeframe Buttons */}
      <div className="flex justify-center gap-2">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => onTimeframeChange?.(tf)}
            className={`cds-btn cds-btn-sm ${
              timeframe === tf
                ? 'cds-btn-primary'
                : 'cds-btn-secondary'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;
