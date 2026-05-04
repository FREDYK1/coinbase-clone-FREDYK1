import { useState, useEffect } from 'react';
import CryptoRow from '../components/crypto/CryptoRow';
import { cryptoData as fallbackCryptoData } from '../data';
import API from '../api/axios';

/**
 * Coinbase-styled Explore page
 * Matches actual Coinbase explore/assets design
 * Fetches crypto data from backend API with fallback to local data
 */
const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeFilter, setActiveFilter] = useState('All');
  const [cryptoData, setCryptoData] = useState(fallbackCryptoData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch crypto data from API
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const { data } = await API.get('/crypto');
        if (data.success && data.data.length > 0) {
          setCryptoData(
            data.data.map((crypto) => ({
              id: crypto._id,
              name: crypto.name,
              symbol: crypto.symbol,
              price: crypto.price,
              change24h: crypto.change24h,
              marketCap: crypto.marketCap || 0,
              volume24h: crypto.volume24h || 0,
              image: crypto.image,
              sparkline: [], // API doesn't provide sparkline data
            }))
          );
        }
      } catch (error) {
        console.log('Using fallback crypto data for Explore page');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  // Filter cryptos based on search
  const filteredCryptos = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort cryptos
  const sortedCryptos = [...filteredCryptos].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'change24h':
        comparison = a.change24h - b.change24h;
        break;
      case 'marketCap':
      default:
        comparison = a.marketCap - b.marketCap;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-bgInverse)' }} className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="d2-ff d2-fw d2-fs d2-fs-m d2-fs-t d2-fs-d d2-lh d2-lh-m d2-lh-t d2-lh-d mb-4" style={{ color: 'var(--color-fgInverse)' }}>Explore crypto</h1>
          <p className="t4-ff t4-fw t4-fs t4-lh" style={{ color: 'var(--color-gray40)' }}>
            Discover and track over 10,000+ cryptocurrencies
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--color-fgMuted)' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search all assets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cds-input pl-12"
            />
          </div>

          {/* Sort Select */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cds-input min-w-40"
            >
              <option value="marketCap">Market Cap</option>
              <option value="price">Price</option>
              <option value="change24h">24h Change</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Tradable', 'Gainers', 'Losers', 'New'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="cds-chip px-4 py-2 rounded-full l2-ff l2-fs l2-fw l2-lh transition-colors"
              style={{
                backgroundColor: activeFilter === filter ? 'var(--color-bgInverse)' : 'var(--color-bgSecondary)',
                color: activeFilter === filter ? 'var(--color-fgInverse)' : 'var(--color-fg)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Table Header */}
        <div 
          className="grid grid-cols-12 gap-4 items-center py-4 px-4 l2-ff l2-fs l2-fw l2-lh"
          style={{ 
            backgroundColor: 'var(--color-bgSecondary)', 
            borderRadius: 'var(--borderRadius-400) var(--borderRadius-400) 0 0',
            color: 'var(--color-fgMuted)'
          }}
        >
          <div className="col-span-1">#</div>
          <div
            className="col-span-4 sm:col-span-3 cursor-pointer flex items-center transition-colors"
            onClick={() => handleSort('name')}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-fg)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-fgMuted)'}
          >
            Name
            {sortBy === 'name' && (
              <svg className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
          <div
            className="col-span-3 sm:col-span-2 text-right cursor-pointer flex items-center justify-end transition-colors"
            onClick={() => handleSort('price')}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-fg)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-fgMuted)'}
          >
            Price
            {sortBy === 'price' && (
              <svg className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
          <div
            className="col-span-2 text-right cursor-pointer flex items-center justify-end transition-colors"
            onClick={() => handleSort('change24h')}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-fg)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-fgMuted)'}
          >
            24h %
            {sortBy === 'change24h' && (
              <svg className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
          <div
            className="hidden sm:flex col-span-2 text-right cursor-pointer items-center justify-end transition-colors"
            onClick={() => handleSort('marketCap')}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-fg)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-fgMuted)'}
          >
            Market Cap
            {sortBy === 'marketCap' && (
              <svg className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
          <div className="hidden md:block col-span-2 text-center">Last 7 days</div>
        </div>

        {/* Crypto List */}
        <div className="cds-card" style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}>
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 border-4 border-[#0052ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="b-ff b-fs b-fw b-lh" style={{ color: 'var(--color-fgMuted)' }}>Loading cryptocurrencies...</p>
            </div>
          ) : sortedCryptos.length > 0 ? (
            sortedCryptos.map((crypto, index) => (
              <CryptoRow key={crypto.id} crypto={crypto} index={index} />
            ))
          ) : (
            <div className="py-12 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: 'var(--color-fgMuted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="b-ff b-fs b-fw b-lh" style={{ color: 'var(--color-fgMuted)' }}>No cryptocurrencies found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4" style={{ backgroundColor: 'var(--color-bgSecondary)', borderRadius: 'var(--borderRadius-400)' }}>
          <p className="c-ff c-fs c-fw c-lh text-center" style={{ color: 'var(--color-fgMuted)' }}>
            Cryptocurrency prices are subject to high market volatility and risk. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
