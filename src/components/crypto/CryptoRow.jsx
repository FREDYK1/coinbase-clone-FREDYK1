import { Link } from 'react-router-dom';
import { formatCurrency, formatPercent, formatLargeNumber } from '../../data';

/**
 * Coinbase-styled CryptoRow component
 * Matches actual Coinbase asset list row style
 */
const CryptoRow = ({ crypto, index }) => {
  const isPositive = crypto.change24h >= 0;

  return (
    <Link
      to={`/asset/${crypto.id}`}
      className="grid grid-cols-12 gap-4 items-center py-4 px-4 transition-colors"
      style={{ borderBottom: '1px solid var(--color-line)' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      {/* Rank */}
      <div className="col-span-1 l2-ff l2-fs l2-fw l2-lh tabular-nums" style={{ color: 'var(--color-fgMuted)' }}>
        {index + 1}
      </div>

      {/* Name and Symbol */}
      <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="l1-ff l1-fs l1-fw l1-lh block" style={{ color: 'var(--color-fg)' }}>{crypto.name}</span>
          <span className="c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>{crypto.symbol}</span>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-3 sm:col-span-2 text-right l1-ff l1-fs l1-fw l1-lh tabular-nums" style={{ color: 'var(--color-fg)' }}>
        {formatCurrency(crypto.price)}
      </div>

      {/* 24h Change */}
      <div className="col-span-2 text-right">
        <span 
          className="px-2 py-1 rounded-full l2-ff l2-fs l2-fw l2-lh"
          style={{ 
            backgroundColor: isPositive ? 'rgba(39,173,117,0.15)' : 'rgba(240,97,109,0.15)',
            color: isPositive ? 'rgb(39,173,117)' : 'rgb(240,97,109)'
          }}
        >
          {isPositive ? '↑' : '↓'} {formatPercent(Math.abs(crypto.change24h))}
        </span>
      </div>

      {/* Market Cap - Hidden on mobile */}
      <div className="hidden sm:block col-span-2 text-right l2-ff l2-fs l2-fw l2-lh tabular-nums" style={{ color: 'var(--color-fgMuted)' }}>
        {formatLargeNumber(crypto.marketCap)}
      </div>

      {/* Mini Chart - Hidden on mobile */}
      <div className="hidden md:block col-span-2">
        <svg className="w-full h-10" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke={isPositive ? 'rgb(39,173,117)' : 'rgb(240,97,109)'}
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
    </Link>
  );
};

export default CryptoRow;
