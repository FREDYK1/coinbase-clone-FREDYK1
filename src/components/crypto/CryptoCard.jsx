import { Link } from 'react-router-dom';
import { formatCurrency, formatPercent } from '../../data';

/**
 * CDS-styled CryptoCard component
 * Matches Coinbase asset card style
 */
const CryptoCard = ({ crypto }) => {
  const isPositive = crypto.change24h >= 0;

  return (
    <Link
      to={`/asset/${crypto.id}`}
      className="block cds-card cds-card-interactive p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="cds-avatar cds-avatar-lg">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="cds-label-1 text-fg">{crypto.name}</h3>
            <p className="cds-caption text-fg-muted">{crypto.symbol}</p>
          </div>
        </div>
        <span className={`cds-chip ${isPositive ? 'cds-chip-positive' : 'cds-chip-negative'}`}>
          {isPositive ? '↑' : '↓'} {formatPercent(Math.abs(crypto.change24h))}
        </span>
      </div>

      {/* Mini Sparkline Chart */}
      <div className="h-12 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`card-gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
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
          <path
            d={`M0,40 L0,${40 - ((crypto.sparkline[0] - Math.min(...crypto.sparkline)) / (Math.max(...crypto.sparkline) - Math.min(...crypto.sparkline) || 1)) * 35} ${crypto.sparkline.map((val, i) => {
              const x = (i / (crypto.sparkline.length - 1)) * 100;
              const min = Math.min(...crypto.sparkline);
              const max = Math.max(...crypto.sparkline);
              const range = max - min || 1;
              const y = 40 - ((val - min) / range) * 35;
              return `L${x},${y}`;
            }).join(' ')} L100,40 Z`}
            fill={`url(#card-gradient-${crypto.id})`}
          />
          <polyline
            fill="none"
            stroke={isPositive ? 'var(--cds-green-60)' : 'var(--cds-red-60)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={crypto.sparkline
              .map((val, i) => {
                const x = (i / (crypto.sparkline.length - 1)) * 100;
                const min = Math.min(...crypto.sparkline);
                const max = Math.max(...crypto.sparkline);
                const range = max - min || 1;
                const y = 40 - ((val - min) / range) * 35;
                return `${x},${y}`;
              })
              .join(' ')}
          />
        </svg>
      </div>

      <div className="cds-title-2 text-fg tabular-nums">
        {formatCurrency(crypto.price)}
      </div>
    </Link>
  );
};

export default CryptoCard;
