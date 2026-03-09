/**
 * CDS-styled Card component
 * Matches Coinbase Design System card styles
 */
const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
  elevated = false,
  variant = 'default'
}) => {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variants = {
    default: 'cds-card',
    elevated: 'cds-card cds-card-elevated',
    outline: 'cds-card border-[var(--cds-line-heavy)]',
    filled: 'bg-cds-alternate rounded-[var(--cds-radius-xl)]'
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${elevated ? variants.elevated : variants[variant]}
        ${paddingSizes[padding]}
        ${hover ? 'cds-card-interactive' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
