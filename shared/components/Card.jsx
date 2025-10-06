import React from 'react';

/**
 * Card Component - Reusable card container
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.variant - Card style variant (default, flat, hover)
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler (makes card clickable)
 */
const Card = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'card';
  
  const variantClasses = {
    default: '',
    flat: 'card-flat',
    hover: 'card-hover',
  };

  const cardClasses = [
    baseClasses,
    variantClasses[variant] || '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');

  const CardElement = onClick ? 'div' : 'div';

  return (
    <CardElement
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e);
        }
      } : undefined}
      {...props}
    >
      {children}
    </CardElement>
  );
};

export default Card;
