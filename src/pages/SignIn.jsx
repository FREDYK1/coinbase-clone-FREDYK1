import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

/**
 * CDS-styled Sign In page
 * Matches Coinbase sign in design
 */

// Coinbase logo component - defined outside the main component
const CoinbaseLogo = () => (
  <svg className="h-10 w-10" viewBox="0 0 1024 1024" fill="currentColor">
    <circle cx="512" cy="512" r="512" fill="var(--cds-blue-60)"/>
    <path d="M516.3 361.83c60.28 0 108.1 37.18 126.26 92.47H764C742 336.09 644.47 256 517.27 256 372.82 256 260 365.65 260 512.49S370 768 517.27 768c124.35 0 223.82-80.09 245.84-199.28H641.87c-18.17 55.3-65.98 92.47-126.26 92.47-78.68 0-143.09-62.44-143.09-148.72s64.41-150.64 143.09-150.64z" fill="white"/>
  </svg>
);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic
    console.log('Sign in:', { email, password });
  };

  return (
    <div className="min-h-screen bg-cds flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center">
              <CoinbaseLogo />
            </Link>
            <h1 className="mt-6 cds-display-3 text-fg">Sign in to Coinbase</h1>
            <p className="mt-2 cds-body text-fg-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-fg-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-fg-muted hover:text-fg transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-[var(--cds-line-heavy)] text-[var(--cds-blue-60)] focus:ring-[var(--cds-blue-60)] focus:ring-offset-0"
                />
                <span className="ml-2 cds-label-2 text-fg-muted">Remember me</span>
              </label>
              <Link to="/forgot-password" className="cds-label-2 text-fg-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth size="lg">
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-[var(--cds-line)]"></div>
            <span className="px-4 cds-caption text-fg-muted">or continue with</span>
            <div className="flex-1 border-t border-[var(--cds-line)]"></div>
          </div>

          {/* Social Sign In */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="cds-btn cds-btn-secondary flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="cds-btn cds-btn-secondary flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          {/* Security Notice */}
          <p className="mt-8 text-center cds-legal text-fg-muted">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="#" className="text-fg-primary hover:underline">Privacy Policy</a> and{' '}
            <a href="#" className="text-fg-primary hover:underline">Terms of Service</a> apply.
          </p>
        </div>
      </div>

      {/* Right Side - Image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 bg-cds-primary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-fg-inverse text-center max-w-lg">
            {/* Decorative elements */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 bg-[var(--cds-blue-40)] rounded-full mx-auto opacity-30 absolute -top-8 -left-8"></div>
              <div className="w-48 h-48 border-4 border-[var(--cds-blue-40)] rounded-full mx-auto opacity-20"></div>
              <div className="w-24 h-24 bg-[var(--cds-blue-80)] rounded-full mx-auto opacity-40 absolute -bottom-4 -right-4"></div>
            </div>
            <h2 className="cds-display-3 mb-6">
              The future of money is here
            </h2>
            <p className="cds-title-4 text-[var(--cds-blue-10)]">
              We're the most trusted place for people and businesses to buy, sell, and manage crypto.
            </p>
          </div>
        </div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
