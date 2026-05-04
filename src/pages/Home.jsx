import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cryptoData as fallbackCryptoData, formatCurrency } from '../data';
import API from '../api/axios';
import Button from '../components/common/Button';
import {
  AdvancedTrade,
  CoinbaseOne,
  BaseApp,
  Prime,
  LearnCards,
  CtaSection,
  Disclaimers,
} from '../components/home';

/**
 * Coinbase-styled Home page
 * Matches actual Coinbase homepage design from www.coinbase.com
 * Fetches crypto data from backend API with fallback to local data
 */
const Home = () => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('tradable');
  const [allCryptos, setAllCryptos] = useState(fallbackCryptoData);
  const [gainersCryptos, setGainersCryptos] = useState([]);
  const [newCryptos, setNewCryptos] = useState([]);

  // Fetch crypto data from API
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const [allRes, gainersRes, newRes] = await Promise.all([
          API.get('/crypto'),
          API.get('/crypto/gainers'),
          API.get('/crypto/new'),
        ]);

        if (allRes.data.success) {
          setAllCryptos(allRes.data.data.map(mapCryptoData));
        }
        if (gainersRes.data.success) {
          setGainersCryptos(gainersRes.data.data.map(mapCryptoData));
        }
        if (newRes.data.success) {
          setNewCryptos(newRes.data.data.map(mapCryptoData));
        }
      } catch (error) {
        // Fallback to local data if API fails
        console.log('Using fallback crypto data');
        setGainersCryptos([...fallbackCryptoData].sort((a, b) => b.change24h - a.change24h));
        setNewCryptos(fallbackCryptoData.slice(4, 10));
      }
    };

    fetchCryptos();
  }, []);

  // Map API data to frontend format
  const mapCryptoData = (crypto) => ({
    id: crypto._id,
    name: crypto.name,
    symbol: crypto.symbol,
    price: crypto.price,
    change24h: crypto.change24h,
    marketCap: crypto.marketCap || 0,
    volume24h: crypto.volume24h || 0,
    image: crypto.image,
  });

  // Filter cryptos based on tab
  const getFilteredCryptos = () => {
    switch (activeTab) {
      case 'gainers':
        return gainersCryptos.slice(0, 6);
      case 'new':
        return newCryptos.slice(0, 6);
      default:
        return allCryptos.slice(0, 6);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to signup with email
    window.location.href = `/signup?email=${encodeURIComponent(email)}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Hero Section - matches actual Coinbase homepage */}
      <section className="w-full min-h-[calc(100vh-64px)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Hero Image */}
            <div className="flex-1 flex justify-center items-center py-12">
              <div className="w-full max-w-[550px] lg:max-w-[650px]">
                <img 
                  src="https://images.ctfassets.net/o10es7wu5gm1/4lbSrfvF333XkPz7WycixQ/afbeefb68eab9405594b2e9bfbb9a152/Hero__4_.png"
                  alt="Coinbase"
                  loading="eager"
                  height="1800"
                  width="1800"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
              <h1 className="d2-ff d2-fw d2-fs d2-fs-m d2-fs-t d2-fs-d d2-lh d2-lh-m d2-lh-t d2-lh-d text-balance" style={{ color: 'var(--color-fg)' }}>
                The future of finance is here.
              </h1>
              <p className="b-ff b-fs b-fw b-lh" style={{ color: 'var(--color-fg)' }}>
                Trade crypto and more on a platform you can trust.
              </p>
              
              {/* Email signup form - exact Coinbase style */}
              <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <div className="flex-1 max-w-[400px]">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="satoshi@nakamoto.com"
                      className="cds-input w-full"
                      style={{ 
                        minHeight: '56px',
                        borderRadius: 'var(--borderRadius-200)'
                      }}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="cdx-button cdx-button-primary cdx-button-lg w-full sm:w-auto"
                    style={{ minWidth: '100px' }}
                  >
                    <span className="l1-ff l1-fs l1-fw l1-lh" style={{ color: 'var(--color-fgInverse)' }}>Sign up</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Crypto Section - matches actual Coinbase */}
      <section className="w-full" style={{ backgroundColor: 'var(--color-bgAlternate)' }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-6 max-w-[600px]">
              <h2 className="t1-ff t1-fw t1-fs t1-fs-m t1-fs-t t1-fs-d t1-lh t1-lh-m t1-lh-t t1-lh-d text-balance" style={{ color: 'var(--color-fg)' }}>
                Explore crypto like Bitcoin, Ethereum, and Dogecoin.
              </h2>
              <p className="c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>
                Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
              </p>
              <div>
                <Link 
                  to="/explore"
                  className="cdx-button cdx-button-inverse cdx-button-lg inline-flex"
                >
                  <span className="l1-ff l1-fs l1-fw l1-lh" style={{ color: 'var(--color-fgInverse)' }}>See more assets</span>
                </Link>
              </div>
            </div>
            
            {/* Crypto Price Card */}
            <div className="flex-1 w-full">
              <div className="rounded-[var(--borderRadius-500)] p-6" style={{ backgroundColor: 'var(--color-bgInverse)' }}>
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  {['tradable', 'gainers', 'new'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        activeTab === tab
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent'
                      }}
                    >
                      {tab === 'tradable' ? 'Tradable' : tab === 'gainers' ? 'Top gainers' : 'New'}
                    </button>
                  ))}
                </div>
                
                {/* Crypto List */}
                <div className="space-y-1">
                  {getFilteredCryptos().map((crypto) => (
                    <Link
                      key={crypto.id}
                      to={`/asset/${crypto.id}`}
                      className="flex items-center justify-between py-4 px-3 -mx-3 rounded-xl transition-colors"
                      style={{ 
                        borderRadius: 'var(--borderRadius-300)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
                          <img src={crypto.image} alt={crypto.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'white' }}>{crypto.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="l2-ff l2-fs l2-fw l2-lh tabular-nums" style={{ color: 'white' }}>{formatCurrency(crypto.price)}</p>
                        <p className={`l-ff l-fs l-fw l-lh ${crypto.change24h >= 0 ? '' : ''}`} 
                           style={{ color: crypto.change24h >= 0 ? 'rgb(39,173,117)' : 'rgb(240,97,109)' }}>
                          {crypto.change24h >= 0 ? '↑' : '↓'} {Math.abs(crypto.change24h).toFixed(2)}%
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <AdvancedTrade />
      <CoinbaseOne />
      <BaseApp />
      <Prime />
      <LearnCards />
      <CtaSection />
      <Disclaimers />
    </div>
  );
};

export default Home;
