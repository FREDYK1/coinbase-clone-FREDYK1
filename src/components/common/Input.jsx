/**
 * Coinbase-styled Input component
 * Matches actual Coinbase input styles from www.coinbase.com
 */
const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  icon,
  className = '',
  helperText,
  disabled = false
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 l2-ff l2-fs l2-fw l2-lh" style={{ color: 'var(--color-fg)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--color-red60)' }}>*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: 'var(--color-fgMuted)' }}>
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`cds-input ${icon ? 'pl-10' : ''}`}
          style={{
            borderColor: error ? 'var(--color-red60)' : undefined,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? 'not-allowed' : undefined
          }}
        />
      </div>
      {helperText && !error && (
        <p className="mt-2 c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-fgMuted)' }}>{helperText}</p>
      )}
      {error && (
        <p className="mt-2 c-ff c-fs c-fw c-lh" style={{ color: 'var(--color-red60)' }}>{error}</p>
      )}
    </div>
  );
};

export default Input;
