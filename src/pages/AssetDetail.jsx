import { useParams, Link } from 'react-router-dom';
import { cryptoData, formatCurrency, formatPercent, formatLargeNumber } from '../data';
import PriceChart from '../components/crypto/PriceChart';
import Button from '../components/common/Button';

/**
 * CDS-styled Asset Detail page
 * Matches Coinbase asset/price page design
 */
const AssetDetail = () => {
  const { id } = useParams();
  const crypto = cryptoData.find((c) => c.id === id);

  if (!crypto) {
    return (
      <div className="min-h-screen bg-cds flex items-center justify-center">
        <div className="text-center">
          <h1 className="cds-display-3 text-fg mb-4">Asset not found</h1>
          <p className="cds-body text-fg-muted mb-8">The cryptocurrency you're looking for doesn't exist.</p>
          <Button to="/explore">Back to Explore</Button>
        </div>
      </div>
    );
  }

  const isPositive = crypto.change24h >= 0;

  return (
    <div className="bg-cds min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-cds border-b border-[var(--cds-line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 cds-label-2">
            <Link to="/explore" className="text-fg-muted hover:text-fg transition-colors">
              Explore
            </Link>
            <svg className="w-4 h-4 text-fg-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-fg font-medium">{crypto.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <PriceChart crypto={crypto} />

            {/* About Section */}
            <div className="cds-card">
              <h2 className="cds-title-2 text-fg mb-4">About {crypto.name}</h2>
              <p className="cds-body text-fg-muted leading-relaxed">
                {crypto.name} ({crypto.symbol}) is one of the leading cryptocurrencies in the market. 
                It offers a decentralized, peer-to-peer network for secure transactions without the need 
                for intermediaries. {crypto.name} has grown significantly since its inception and continues 
                to be a popular choice among investors and traders worldwide.
              </p>
              <button className="cds-label-1 text-fg-primary hover:underline mt-4">
                Read more
              </button>
            </div>

            {/* Market Stats */}
            <div className="cds-card">
              <h2 className="cds-title-2 text-fg mb-6">{crypto.name} statistics</h2>
              <div className="grid sm:grid-cols-2 gap-x-8">
                {[
                  { label: 'Market cap', value: formatLargeNumber(crypto.marketCap) },
                  { label: 'Volume (24h)', value: formatLargeNumber(crypto.volume24h) },
                  { label: 'Circulating supply', value: `${(crypto.marketCap / crypto.price).toLocaleString(undefined, { maximumFractionDigits: 0 })} ${crypto.symbol}` },
                  { label: 'All time high', value: formatCurrency(crypto.price * 1.5) },
                  { label: 'Price change (24h)', value: formatPercent(crypto.change24h), isChange: true },
                  { label: 'Popularity', value: `#${cryptoData.indexOf(crypto) + 1}` }
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between py-4 border-b border-[var(--cds-line)]">
                    <span className="cds-body text-fg-muted">{stat.label}</span>
                    <span className={`cds-label-1 tabular-nums ${
                      stat.isChange 
                        ? isPositive ? 'text-fg-positive' : 'text-fg-negative'
                        : 'text-fg'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="cds-card">
              <h2 className="cds-title-2 text-fg mb-4">Resources</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: '🌐', label: 'Official website', href: '#' },
                  { icon: '📄', label: 'Whitepaper', href: '#' },
                  { icon: '💬', label: 'Community', href: '#' },
                  { icon: '📊', label: 'Price history', href: '#' }
                ].map((resource, index) => (
                  <a
                    key={index}
                    href={resource.href}
                    className="flex items-center gap-3 p-3 rounded-[var(--cds-radius-lg)] border border-[var(--cds-line)] hover:border-[var(--cds-line-heavy)] hover:bg-cds-alternate transition-all"
                  >
                    <span className="text-xl">{resource.icon}</span>
                    <span className="cds-label-1 text-fg">{resource.label}</span>
                    <svg className="w-4 h-4 text-fg-muted ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Buy/Sell Card */}
            <div className="cds-card sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="cds-avatar cds-avatar-lg">
                  <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="cds-title-3 text-fg">{crypto.name}</h3>
                  <p className="cds-label-2 text-fg-muted">{crypto.symbol}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="cds-display-3 text-fg tabular-nums">{formatCurrency(crypto.price)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`cds-label-1 ${isPositive ? 'text-fg-positive' : 'text-fg-negative'}`}>
                    {isPositive ? '↑' : '↓'} {formatPercent(crypto.change24h)}
                  </span>
                  <span className="cds-caption text-fg-muted">today</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button to="/signup" fullWidth size="lg">
                  Buy {crypto.symbol}
                </Button>
                <Button to="/signup" variant="secondary" fullWidth size="lg">
                  Sell {crypto.symbol}
                </Button>
              </div>

              <p className="cds-caption text-fg-muted text-center mt-4">
                Sign up to start trading
              </p>
            </div>

            {/* Related Assets */}
            <div className="cds-card">
              <h3 className="cds-title-3 text-fg mb-4">Related assets</h3>
              <div className="space-y-1">
                {cryptoData
                  .filter((c) => c.id !== crypto.id)
                  .slice(0, 4)
                  .map((relatedCrypto) => (
                    <Link
                      key={relatedCrypto.id}
                      to={`/asset/${relatedCrypto.id}`}
                      className="flex items-center justify-between p-3 -mx-3 rounded-[var(--cds-radius-lg)] hover:bg-cds-alternate transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="cds-avatar cds-avatar-sm">
                          <img src={relatedCrypto.image} alt={relatedCrypto.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="cds-label-1 text-fg">{relatedCrypto.name}</p>
                          <p className="cds-caption text-fg-muted">{relatedCrypto.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="cds-label-1 text-fg tabular-nums">{formatCurrency(relatedCrypto.price)}</p>
                        <p className={`cds-caption ${relatedCrypto.change24h >= 0 ? 'text-fg-positive' : 'text-fg-negative'}`}>
                          {relatedCrypto.change24h >= 0 ? '↑' : '↓'} {formatPercent(relatedCrypto.change24h)}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
              <Link to="/explore" className="block mt-4 cds-label-1 text-fg-primary hover:underline text-center">
                View all assets →
              </Link>
            </div>

            {/* News Section */}
            <div className="cds-card">
              <h3 className="cds-title-3 text-fg mb-4">{crypto.name} news</h3>
              <div className="space-y-4">
                {[
                  { title: `${crypto.name} reaches new milestone`, time: '2 hours ago' },
                  { title: 'Market analysis: Weekly overview', time: '5 hours ago' },
                  { title: `Why investors are watching ${crypto.symbol}`, time: '1 day ago' }
                ].map((news, index) => (
                  <div key={index} className="pb-4 border-b border-[var(--cds-line)] last:border-0 last:pb-0">
                    <p className="cds-label-1 text-fg hover:text-fg-primary cursor-pointer transition-colors">
                      {news.title}
                    </p>
                    <p className="cds-caption text-fg-muted mt-1">{news.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
