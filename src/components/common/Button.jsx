/**
 * Coinbase-styled Button component
 * Supports polymorphic rendering via `as` prop
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  as: Component,
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button',
  className = '',
  startIcon,
  endIcon,
  ...rest
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors';
  
  const variants = {
    primary: 'bg-[#0052ff] text-white hover:bg-[#0040c9]',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    tertiary: 'bg-transparent text-slate-700 hover:bg-slate-100',
    ghost: 'bg-transparent text-slate-700 hover:text-slate-900',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    inverse: 'bg-white text-slate-900 hover:bg-slate-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = [
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {startIcon && <span className="-ml-1 mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2 -mr-1">{endIcon}</span>}
    </>
  );

  // If `as` prop is provided, use it as the component
  if (Component) {
    return (
      <Component to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </Component>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default Button;
