import { useState, useEffect, useRef } from 'react';

/**
 * Demo Banner Component
 * Displays a warning at the top of the app indicating this is a student project.
 * Can be dismissed by the user.
 * Sets a CSS variable --demo-banner-height on <html> so the fixed navbar
 * can offset itself and not overlap.
 */
const DemoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef(null);

  // Set CSS variable on <html> so navbar knows the banner height
  useEffect(() => {
    const updateHeight = () => {
      if (isVisible && bannerRef.current) {
        const height = bannerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--demo-banner-height', `${height}px`);
      } else {
        document.documentElement.style.setProperty('--demo-banner-height', '0px');
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      document.documentElement.style.setProperty('--demo-banner-height', '0px');
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      id="demo-banner"
      style={{
        background: 'linear-gradient(90deg, #f59e0b, #d97706)',
        color: '#1a1a1a',
        position: 'sticky',
        top: 0,
        zIndex: 60,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-3">
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.01em' }}>
          ⚠️ This is a student project for educational purposes only. It is not affiliated with, endorsed by, or connected to Coinbase, Inc.
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DemoBanner;
