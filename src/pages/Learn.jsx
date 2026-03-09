import { Link } from 'react-router-dom';
import { learnArticles } from '../data';
import Button from '../components/common/Button';

/**
 * CDS-styled Learn page
 * Matches Coinbase Learn design
 */
const Learn = () => {
  return (
    <div className="bg-cds min-h-screen">
      {/* Hero Section */}
      <section className="bg-cds-inverse py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="cds-display-2 lg:cds-display-1 text-fg-inverse mb-6">
              Learn about crypto
            </h1>
            <p className="cds-title-4 text-[var(--cds-gray-40)] mb-8">
              Browse tutorials, guides, and crypto explainers to learn more about Bitcoin, 
              Ethereum, DeFi, and more. Earn rewards while you learn.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="cds-chip cds-chip-default bg-[var(--cds-gray-70)] text-fg-inverse border-0">Beginner</span>
              <span className="cds-chip cds-chip-default bg-[var(--cds-gray-70)] text-fg-inverse border-0">Intermediate</span>
              <span className="cds-chip cds-chip-default bg-[var(--cds-gray-70)] text-fg-inverse border-0">Advanced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Earn Crypto Section */}
      <section className="py-12 bg-cds">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[var(--cds-green-60)] rounded-[var(--cds-radius-3xl)] p-8 lg:p-12 text-fg-inverse">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block cds-label-1 bg-white/20 px-4 py-1.5 rounded-full mb-4">
                  Earn & Learn
                </span>
                <h2 className="cds-display-3 mb-4">
                  Earn free crypto while learning
                </h2>
                <p className="cds-body text-[var(--cds-green-10)] mb-8">
                  Watch videos, take quizzes, and earn free cryptocurrency. The more you learn, 
                  the more you can earn.
                </p>
                <Button to="/signup" variant="secondary" size="lg" className="bg-cds text-[var(--cds-green-60)] hover:bg-cds-alternate">
                  Start earning
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { amount: '$5+', label: 'in BTC rewards' },
                    { amount: '$3+', label: 'in ETH rewards' },
                    { amount: '$4+', label: 'in SOL rewards' },
                    { amount: '20+', label: 'courses available' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-[var(--cds-radius-xl)] p-4 text-center">
                      <p className="cds-title-2">{item.amount}</p>
                      <p className="cds-caption text-[var(--cds-green-10)]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-cds">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="cds-display-3 text-fg mb-8">
            Featured articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learnArticles.map((article) => (
              <article
                key={article.id}
                className="cds-card cds-card-interactive overflow-hidden p-0 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {article.reward > 0 && (
                    <span className="absolute top-4 right-4 cds-label-2 bg-[var(--cds-green-60)] text-fg-inverse px-3 py-1 rounded-full">
                      Earn ${article.reward}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`cds-label-2 px-3 py-1 rounded-full ${
                      article.category === 'Beginner' 
                        ? 'bg-cds-primary-subtle text-fg-primary' 
                        : 'bg-[var(--cds-green-10)] text-[var(--cds-green-70)]'
                    }`}>
                      {article.category.toUpperCase()}
                    </span>
                    <span className="cds-caption text-fg-muted">{article.readTime}</span>
                  </div>
                  <h3 className="cds-title-3 text-fg mb-2 group-hover:text-fg-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="cds-body text-fg-muted">
                    {article.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-16 bg-cds-alternate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="cds-display-3 text-fg mb-8">
            Browse by topic
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Bitcoin', icon: '₿', color: 'bg-[#F7931A]' },
              { name: 'Ethereum', icon: '◊', color: 'bg-[#627EEA]' },
              { name: 'DeFi', icon: '🏦', color: 'bg-cds-primary' },
              { name: 'NFTs', icon: '🖼️', color: 'bg-[var(--cds-pink-60)]' },
              { name: 'Trading', icon: '📈', color: 'bg-[var(--cds-green-60)]' },
              { name: 'Security', icon: '🔒', color: 'bg-[var(--cds-red-60)]' },
              { name: 'Wallets', icon: '👛', color: 'bg-[var(--cds-indigo-60)]' },
              { name: 'Blockchain', icon: '⛓️', color: 'bg-[var(--cds-gray-70)]' },
            ].map((topic) => (
              <button
                key={topic.name}
                className="cds-card cds-card-interactive flex items-center gap-4 p-4"
              >
                <span className={`${topic.color} text-fg-inverse text-2xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                  {topic.icon}
                </span>
                <span className="cds-label-1 text-fg">{topic.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-cds">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="cds-display-3 text-fg mb-8 text-center">
            Frequently asked questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is cryptocurrency?',
                a: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security. It operates on a decentralized network called blockchain.'
              },
              {
                q: 'How do I buy cryptocurrency?',
                a: 'You can buy cryptocurrency through exchanges like Coinbase. Simply create an account, verify your identity, and make a purchase using your preferred payment method.'
              },
              {
                q: 'Is cryptocurrency safe?',
                a: 'Cryptocurrency itself is secure due to blockchain technology, but you should always practice good security habits like using strong passwords and enabling two-factor authentication.'
              },
              {
                q: 'What is blockchain?',
                a: 'Blockchain is a distributed ledger technology that records transactions across many computers. It ensures transparency and security of data.'
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="cds-card group"
              >
                <summary className="flex items-center justify-between cursor-pointer cds-title-4 text-fg">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-fg-muted group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 cds-body text-fg-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cds-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="cds-display-3 text-fg-inverse mb-4">
            Ready to start learning?
          </h2>
          <p className="cds-title-4 text-[var(--cds-blue-10)] mb-8">
            Create a free account and start earning crypto today.
          </p>
          <Button to="/signup" variant="secondary" size="lg" className="bg-cds text-fg-primary hover:bg-cds-alternate">
            Get started
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Learn;
