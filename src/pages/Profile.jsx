import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Protected User Profile/Dashboard Page
 * Displays user information and account details
 * Redirects to login if not authenticated
 */
const Profile = () => {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }} className="flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#0052ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="b-ff b-fs b-fw b-lh" style={{ color: 'var(--color-fgMuted)' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const joinDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-bgInverse)' }} className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="d2-ff d2-fw d2-fs d2-fs-m d2-fs-t d2-fs-d d2-lh d2-lh-m d2-lh-t d2-lh-d mb-4"
            style={{ color: 'var(--color-fgInverse)' }}
          >
            My Profile
          </h1>
          <p className="t4-ff t4-fw t4-fs t4-lh" style={{ color: 'var(--color-gray40)' }}>
            Your account dashboard
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div
              className="cds-card p-8"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              {/* Avatar and Name */}
              <div className="flex items-center gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid var(--color-line)' }}>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                  style={{
                    backgroundColor: '#0052ff',
                    color: 'white',
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="t1-ff t1-fw t1-fs t1-lh" style={{ color: 'var(--color-fg)' }}>
                    {user.name}
                  </h2>
                  <p className="b-ff b-fs b-fw b-lh" style={{ color: 'var(--color-fgMuted)' }}>
                    Member since {joinDate}
                  </p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-6">
                <div>
                  <label className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fgMuted)' }}>
                    Full Name
                  </label>
                  <p className="t4-ff t4-fw t4-fs t4-lh mt-1" style={{ color: 'var(--color-fg)' }}>
                    {user.name}
                  </p>
                </div>

                <div>
                  <label className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fgMuted)' }}>
                    Email Address
                  </label>
                  <p className="t4-ff t4-fw t4-fs t4-lh mt-1" style={{ color: 'var(--color-fg)' }}>
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fgMuted)' }}>
                    Account ID
                  </label>
                  <p className="t4-ff t4-fw t4-fs t4-lh mt-1" style={{ color: 'var(--color-fg)' }}>
                    {user._id}
                  </p>
                </div>

                <div>
                  <label className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fgMuted)' }}>
                    Account Created
                  </label>
                  <p className="t4-ff t4-fw t4-fs t4-lh mt-1" style={{ color: 'var(--color-fg)' }}>
                    {joinDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div
              className="cds-card p-6"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              <h3 className="t4-ff t4-fw t4-fs t4-lh mb-4" style={{ color: 'var(--color-fg)' }}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/explore"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: 'var(--color-bgSecondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)')}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0052ff' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Explore Crypto</span>
                </Link>

                <Link
                  to="/add-crypto"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: 'var(--color-bgSecondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)')}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0052ff' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Add Cryptocurrency</span>
                </Link>

                <Link
                  to="/learn"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: 'var(--color-bgSecondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)')}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(39,173,117)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Learn & Earn</span>
                </Link>
              </div>
            </div>

            {/* Security Card */}
            <div
              className="cds-card p-6"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              <h3 className="t4-ff t4-fw t4-fs t4-lh mb-4" style={{ color: 'var(--color-fg)' }}>
                Account Security
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(39,173,117)' }}></div>
                <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Account active</span>
              </div>
              <p className="c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>
                Your account is secured with JWT authentication.
              </p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-bgSecondary)',
                color: 'var(--color-red60, #dc2626)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
