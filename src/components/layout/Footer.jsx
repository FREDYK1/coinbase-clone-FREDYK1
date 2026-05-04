import { Link } from 'react-router-dom';

/**
 * Coinbase-styled Footer component
 * Matches actual Coinbase footer from www.coinbase.com
 */

// Coinbase Logo Component
const CoinbaseLogo = ({ className = "h-10 w-10" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#0052FF"/>
    <path d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zm0 25.6c-5.302 0-9.6-4.298-9.6-9.6s4.298-9.6 9.6-9.6c4.418 0 8.134 2.99 9.244 7.058h-5.062c-.818-1.406-2.35-2.358-4.182-2.358-2.65 0-4.8 2.15-4.8 4.8s2.15 4.8 4.8 4.8c1.832 0 3.364-.952 4.182-2.358h5.062C32.134 30.61 28.418 33.6 24 33.6z" fill="white"/>
  </svg>
);

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/learn' },
        { name: 'Careers', path: '/learn' },
        { name: 'Affiliates', path: '/learn' },
        { name: 'Blog', path: '/learn' },
        { name: 'Press', path: '/learn' },
        { name: 'Security', path: '/learn' },
        { name: 'Investors', path: '/learn' },
        { name: 'Vendors', path: '/learn' },
        { name: 'Legal & privacy', path: '/learn' },
        { name: 'Cookie policy', path: '/learn' },
        { name: 'Cookie preferences', path: '/learn' },
        { name: 'Digital Asset Disclosures', path: '/learn' },
      ]
    },
    {
      title: 'Learn',
      links: [
        { name: 'Explore', path: '/explore' },
        { name: 'Market statistics', path: '/learn' },
        { name: 'Coinbase Bytes newsletter', path: '/learn' },
        { name: 'Crypto basics', path: '/learn' },
        { name: 'Tips & tutorials', path: '/learn' },
        { name: 'Crypto glossary', path: '/learn' },
        { name: 'Market updates', path: '/learn' },
        { name: 'What is Bitcoin?', path: '/learn' },
        { name: 'What is crypto?', path: '/learn' },
        { name: 'What is a blockchain?', path: '/learn' },
        { name: 'How to set up a crypto wallet?', path: '/learn' },
        { name: 'How to send crypto?', path: '/learn' },
        { name: 'Taxes', path: '/learn' },
      ]
    },
    {
      title: 'Individuals',
      links: [
        { name: 'Buy & sell', path: '/explore' },
        { name: 'Earn free crypto', path: '/learn' },
        { name: 'Base App', path: '/learn' },
        { name: 'Coinbase One', path: '/learn' },
        { name: 'Debit Card', path: '/learn' },
      ],
      subsections: [
        {
          title: 'Businesses',
          links: [
            { name: 'Asset Listings', path: '/learn' },
            { name: 'Coinbase Business', path: '/learn' },
            { name: 'Payments', path: '/learn' },
            { name: 'Commerce', path: '/learn' },
            { name: 'Token Manager', path: '/learn' },
          ]
        },
        {
          title: 'Institutions',
          links: [
            { name: 'Prime', path: '/learn' },
            { name: 'Staking', path: '/learn' },
            { name: 'Exchange', path: '/learn' },
            { name: 'International Exchange', path: '/learn' },
            { name: 'Derivatives Exchange', path: '/learn' },
            { name: 'Verified Pools', path: '/learn' },
          ]
        }
      ]
    },
    {
      title: 'Developers',
      links: [
        { name: 'Developer Platform', path: '/learn' },
        { name: 'Base', path: '/learn' },
        { name: 'Server Wallets', path: '/learn' },
        { name: 'Embedded Wallets', path: '/learn' },
        { name: 'Base Accounts (Smart Wallets)', path: '/learn' },
        { name: 'Onramp & Offramp', path: '/learn' },
        { name: 'x402', path: '/learn' },
        { name: 'Trade API', path: '/learn' },
        { name: 'Paymaster', path: '/learn' },
        { name: 'OnchainKit', path: '/learn' },
        { name: 'Data API', path: '/learn' },
        { name: 'Verifications', path: '/learn' },
        { name: 'Node', path: '/learn' },
        { name: 'AgentKit', path: '/learn' },
        { name: 'Staking', path: '/learn' },
        { name: 'Faucet', path: '/learn' },
        { name: 'Exchange API', path: '/learn' },
        { name: 'International Exchange API', path: '/learn' },
        { name: 'Prime API', path: '/learn' },
        { name: 'Derivatives API', path: '/learn' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help center', path: '/learn' },
        { name: 'Contact us', path: '/learn' },
        { name: 'Create account', path: '/signup' },
        { name: 'ID verification', path: '/learn' },
        { name: 'Account information', path: '/learn' },
        { name: 'Payment methods', path: '/learn' },
        { name: 'Account access', path: '/signin' },
        { name: 'Supported crypto', path: '/explore' },
        { name: 'Status', path: '/learn' },
      ],
      subsections: [
        {
          title: 'Asset prices',
          links: [
            { name: 'Bitcoin price', path: '/explore' },
            { name: 'Ethereum price', path: '/explore' },
            { name: 'Solana price', path: '/explore' },
            { name: 'XRP price', path: '/explore' },
          ]
        },
        {
          title: 'Stock prices',
          links: [
            { name: 'NVIDIA price', path: '/learn' },
            { name: 'Apple price', path: '/learn' },
            { name: 'Microsoft price', path: '/learn' },
            { name: 'Amazon price', path: '/learn' },
          ]
        }
      ]
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="inline-block">
              <CoinbaseLogo className="h-12 w-12" />
            </Link>
          </div>

          {/* Footer Links Grid */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                {/* Main Section */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.path}
                          className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subsections */}
                {section.subsections?.map((subsection) => (
                  <div key={subsection.title}>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">
                      {subsection.title}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex items-center gap-5">
          <a 
            href="https://x.com/coinbase" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">X (Twitter)</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/company/coinbase" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com/coinbase" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">Instagram</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="https://tiktok.com/@coinbase" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="sr-only">TikTok</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </a>
        </div>

        {/* Demo Disclaimer */}
        <div
          className="mt-8 p-4 rounded-xl flex items-start gap-3"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
          }}
        >
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#d97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#92400e' }}>
              📋 Demo Project Disclaimer
            </p>
            <p className="text-xs mt-1" style={{ color: '#92400e', opacity: 0.85 }}>
              This is a student demonstration project built for educational purposes only. It is not a real cryptocurrency exchange.
              Please <strong>do not enter real personal information, passwords, or financial data</strong>. No real transactions
              are processed. This project is not affiliated with, endorsed by, or connected to Coinbase, Inc.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>© 2026 Coinbase</span>
              <span>•</span>
              <Link to="/learn" className="hover:text-slate-900 transition-colors">Privacy</Link>
              <span>•</span>
              <Link to="/learn" className="hover:text-slate-900 transition-colors">Terms & Conditions</Link>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>Global</span>
              <span>•</span>
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
