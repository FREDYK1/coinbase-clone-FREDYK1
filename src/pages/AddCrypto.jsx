import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import API from '../api/axios';

/**
 * Add Cryptocurrency Page
 * Allows users to add a new cryptocurrency via POST /api/crypto
 * Collects: Name, Symbol, Price, Image URL, 24h Change
 */
const AddCrypto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: '',
  });
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'
  const [imageFileName, setImageFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded file to base64 data URL
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, SVG, WEBP).');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image file must be smaller than 2MB.');
      return;
    }

    setError('');
    setImageFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  // Switch image mode and clear image data
  const switchImageMode = (mode) => {
    setImageMode(mode);
    setFormData((prev) => ({ ...prev, image: '' }));
    setImageFileName('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!formData.name || !formData.symbol || !formData.price || !formData.image || formData.change24h === '') {
      setError('Please fill in all required fields.');
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      setError('Price must be a valid positive number.');
      return;
    }

    if (isNaN(Number(formData.change24h))) {
      setError('24h Change must be a valid number (e.g. +2.5 or -1.3).');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        symbol: formData.symbol.trim().toUpperCase(),
        price: Number(formData.price),
        image: imageMode === 'url' ? formData.image.trim() : formData.image,
        change24h: Number(formData.change24h),
      };

      const { data } = await API.post('/crypto', payload);

      if (data.success) {
        setSuccess('Cryptocurrency added successfully! Redirecting to Explore...');
        setFormData({ name: '', symbol: '', price: '', image: '', change24h: '' });
        setImageFileName('');
        setTimeout(() => navigate('/explore'), 2000);
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add cryptocurrency. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--color-bgInverse)' }} className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="d2-ff d2-fw d2-fs d2-fs-m d2-fs-t d2-fs-d d2-lh d2-lh-m d2-lh-t d2-lh-d mb-4"
            style={{ color: 'var(--color-fgInverse)' }}
          >
            Add Cryptocurrency
          </h1>
          <p className="t4-ff t4-fw t4-fs t4-lh" style={{ color: 'var(--color-gray40)' }}>
            List a new cryptocurrency on the platform
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <div
              className="cds-card p-8"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              <h2 className="t1-ff t1-fw t1-fs t1-lh mb-6" style={{ color: 'var(--color-fg)' }}>
                Cryptocurrency Details
              </h2>

              {/* Error Message */}
              {error && (
                <div
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ backgroundColor: 'rgba(240, 97, 109, 0.1)', border: '1px solid rgba(240, 97, 109, 0.3)' }}
                >
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(240, 97, 109)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="b-ff b-fs b-fw b-lh" style={{ color: 'rgb(240, 97, 109)' }}>{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{ backgroundColor: 'rgba(39, 173, 117, 0.1)', border: '1px solid rgba(39, 173, 117, 0.3)' }}
                >
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'rgb(39, 173, 117)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="b-ff b-fs b-fw b-lh" style={{ color: 'rgb(39, 173, 117)' }}>{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Symbol row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="e.g. Bitcoin"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Symbol"
                    type="text"
                    name="symbol"
                    placeholder="e.g. BTC"
                    value={formData.symbol}
                    onChange={handleChange}
                    helperText="Will be converted to uppercase"
                    required
                  />
                </div>

                {/* Price and 24h Change row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Price (USD)"
                    type="number"
                    name="price"
                    placeholder="e.g. 67500.00"
                    value={formData.price}
                    onChange={handleChange}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    required
                  />
                  <Input
                    label="24h Change (%)"
                    type="number"
                    name="change24h"
                    placeholder="e.g. +2.5 or -1.3"
                    value={formData.change24h}
                    onChange={handleChange}
                    helperText="Percentage change in price over 24 hours"
                    required
                  />
                </div>

                {/* Image Section */}
                <div className="w-full">
                  <label className="block mb-2 l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>
                    Image <span style={{ color: 'var(--color-red60)' }}>*</span>
                  </label>

                  {/* Image Mode Toggle */}
                  <div
                    className="flex rounded-xl overflow-hidden mb-4"
                    style={{ backgroundColor: 'var(--color-bgSecondary)', border: '1px solid var(--color-line)' }}
                  >
                    <button
                      type="button"
                      onClick={() => switchImageMode('url')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 l2-ff l2-fs l2-fw l2-lh transition-all"
                      style={{
                        backgroundColor: imageMode === 'url' ? '#0052ff' : 'transparent',
                        color: imageMode === 'url' ? 'white' : 'var(--color-fgMuted)',
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Image Link
                    </button>
                    <button
                      type="button"
                      onClick={() => switchImageMode('upload')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 l2-ff l2-fs l2-fw l2-lh transition-all"
                      style={{
                        backgroundColor: imageMode === 'upload' ? '#0052ff' : 'transparent',
                        color: imageMode === 'upload' ? 'white' : 'var(--color-fgMuted)',
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Image
                    </button>
                  </div>

                  {/* URL Input */}
                  {imageMode === 'url' && (
                    <Input
                      type="url"
                      name="image"
                      placeholder="https://example.com/crypto-logo.png"
                      value={formData.image}
                      onChange={handleChange}
                      helperText="Direct link to the cryptocurrency logo image"
                      icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      }
                    />
                  )}

                  {/* File Upload */}
                  {imageMode === 'upload' && (
                    <div>
                      <label
                        htmlFor="crypto-image-upload"
                        className="flex flex-col items-center justify-center gap-3 p-8 rounded-xl cursor-pointer transition-all"
                        style={{
                          border: '2px dashed var(--color-line)',
                          backgroundColor: formData.image ? 'rgba(0, 82, 255, 0.05)' : 'var(--color-bgSecondary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0052ff';
                          e.currentTarget.style.backgroundColor = 'rgba(0, 82, 255, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-line)';
                          if (!formData.image) {
                            e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)';
                          }
                        }}
                      >
                        {formData.image ? (
                          <>
                            <div className="w-16 h-16 rounded-full overflow-hidden" style={{ border: '3px solid #0052ff' }}>
                              <img src={formData.image} alt="Uploaded" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-center">
                              <p className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>
                                {imageFileName}
                              </p>
                              <p className="c-ff c-fs c-fw c-lh mt-1" style={{ color: '#0052ff' }}>
                                Click to change image
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: 'rgba(0, 82, 255, 0.1)' }}
                            >
                              <svg className="w-7 h-7" style={{ color: '#0052ff' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                            </div>
                            <div className="text-center">
                              <p className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>
                                Click to upload an image
                              </p>
                              <p className="c-ff c-fs c-fw c-lh mt-1" style={{ color: 'var(--color-fgMuted)' }}>
                                PNG, JPG, SVG or WEBP (max 2MB)
                              </p>
                            </div>
                          </>
                        )}
                      </label>
                      <input
                        id="crypto-image-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--color-bgSecondary)' }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                      }}
                    />
                    <div>
                      <p className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Image Preview</p>
                      <p className="c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>
                        {formData.name || 'Cryptocurrency'} logo
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4" style={{ borderTop: '1px solid var(--color-line)' }}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    startIcon={
                      isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )
                    }
                  >
                    {isLoading ? 'Adding...' : 'Add Cryptocurrency'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/explore')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <div
              className="cds-card p-6"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              <h3 className="t4-ff t4-fw t4-fs t4-lh mb-4" style={{ color: 'var(--color-fg)' }}>
                Listing Guidelines
              </h3>
              <ul className="space-y-3">
                {[
                  'Provide the official cryptocurrency name',
                  'Use the standard trading symbol (e.g. BTC, ETH)',
                  'Enter the current market price in USD',
                  'Use a high-quality logo image URL',
                  '24h change should reflect recent price movement',
                ].map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#0052ff' }}
                    >
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>
                      {guideline}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div
              className="cds-card p-6"
              style={{ borderRadius: 'var(--borderRadius-500)' }}
            >
              <h3 className="t4-ff t4-fw t4-fs t4-lh mb-4" style={{ color: 'var(--color-fg)' }}>
                Quick Links
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
                  <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Explore All Crypto</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors"
                  style={{ backgroundColor: 'var(--color-bgSecondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgTertiary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bgSecondary)')}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(39,173,117)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCrypto;
