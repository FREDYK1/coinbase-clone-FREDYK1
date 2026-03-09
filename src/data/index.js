// Mock cryptocurrency data
export const cryptoData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 97234.56,
    change24h: 2.34,
    marketCap: 1920000000000,
    volume24h: 28500000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    sparkline: [95000, 95500, 96000, 95800, 96500, 97000, 97234]
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.78,
    change24h: 1.56,
    marketCap: 415000000000,
    volume24h: 15200000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    sparkline: [3400, 3420, 3450, 3430, 3460, 3470, 3456]
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
    price: 1.00,
    change24h: 0.01,
    marketCap: 95000000000,
    volume24h: 45000000000,
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    sparkline: [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    price: 634.12,
    change24h: -0.89,
    marketCap: 97000000000,
    volume24h: 1200000000,
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    sparkline: [640, 638, 635, 632, 634, 633, 634]
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 189.45,
    change24h: 4.23,
    marketCap: 82000000000,
    volume24h: 3500000000,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    sparkline: [180, 182, 185, 183, 187, 188, 189]
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    price: 2.34,
    change24h: 1.12,
    marketCap: 134000000000,
    volume24h: 8900000000,
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    sparkline: [2.30, 2.31, 2.32, 2.33, 2.32, 2.34, 2.34]
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.98,
    change24h: -1.45,
    marketCap: 34500000000,
    volume24h: 890000000,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    sparkline: [1.00, 0.99, 0.98, 0.99, 0.98, 0.97, 0.98]
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.38,
    change24h: 3.67,
    marketCap: 56000000000,
    volume24h: 2300000000,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    sparkline: [0.36, 0.365, 0.37, 0.375, 0.378, 0.38, 0.38]
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.89,
    change24h: 0.78,
    marketCap: 11000000000,
    volume24h: 450000000,
    image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
    sparkline: [7.80, 7.82, 7.85, 7.84, 7.87, 7.88, 7.89]
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 38.56,
    change24h: 2.15,
    marketCap: 15800000000,
    volume24h: 620000000,
    image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    sparkline: [37.50, 37.80, 38.00, 37.90, 38.20, 38.40, 38.56]
  }
];

// Learning articles data
export const learnArticles = [
  {
    id: 1,
    title: 'What is Bitcoin?',
    description: 'Learn about the first and most well-known cryptocurrency that started the digital currency revolution.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400',
    category: 'Beginner',
    readTime: '5 min read',
    reward: 3
  },
  {
    id: 2,
    title: 'What is Ethereum?',
    description: 'Discover how Ethereum enables smart contracts and decentralized applications.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400',
    category: 'Beginner',
    readTime: '6 min read',
    reward: 3
  },
  {
    id: 3,
    title: 'What is DeFi?',
    description: 'Explore decentralized finance and how it is transforming traditional financial services.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
    category: 'Intermediate',
    readTime: '8 min read',
    reward: 5
  },
  {
    id: 4,
    title: 'How to secure your crypto',
    description: 'Best practices for keeping your cryptocurrency safe from hackers and scams.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    category: 'Beginner',
    readTime: '7 min read',
    reward: 4
  },
  {
    id: 5,
    title: 'Understanding NFTs',
    description: 'Learn what non-fungible tokens are and how they are changing digital ownership.',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400',
    category: 'Intermediate',
    readTime: '6 min read',
    reward: 4
  },
  {
    id: 6,
    title: 'Blockchain explained',
    description: 'A deep dive into blockchain technology and how it powers cryptocurrencies.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400',
    category: 'Beginner',
    readTime: '10 min read',
    reward: 5
  }
];

// Trending assets
export const trendingAssets = cryptoData.slice(0, 4);

// Top gainers (sorted by 24h change)
export const topGainers = [...cryptoData].sort((a, b) => b.change24h - a.change24h).slice(0, 4);

// Navigation links
export const navLinks = [
  { name: 'Explore', path: '/explore' },
  { name: 'Learn', path: '/learn' },
  { name: 'Individuals', path: '/' },
  { name: 'Businesses', path: '/' },
  { name: 'Developers', path: '/' }
];

// Footer links
export const footerLinks = {
  company: [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Affiliates', path: '/affiliates' },
    { name: 'Blog', path: '/blog' },
    { name: 'Press', path: '/press' }
  ],
  learn: [
    { name: 'Crypto basics', path: '/learn' },
    { name: 'Tips & tutorials', path: '/learn' },
    { name: 'Market updates', path: '/learn' },
    { name: 'What is Bitcoin?', path: '/learn' },
    { name: 'What is crypto?', path: '/learn' }
  ],
  support: [
    { name: 'Help center', path: '/support' },
    { name: 'Contact us', path: '/contact' },
    { name: 'Create account', path: '/signup' },
    { name: 'ID verification', path: '/support' },
    { name: 'Account info', path: '/support' }
  ],
  legal: [
    { name: 'Privacy', path: '/privacy' },
    { name: 'Terms', path: '/terms' },
    { name: 'Cookie policy', path: '/cookies' },
    { name: 'Licenses', path: '/licenses' }
  ]
};

// Format number to currency
export const formatCurrency = (num) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

// Format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return formatCurrency(num);
};

// Format percentage
export const formatPercent = (num) => {
  const sign = num >= 0 ? '+' : '';
  return `${sign}${num.toFixed(2)}%`;
};
