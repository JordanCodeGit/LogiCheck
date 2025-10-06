import React from 'react';

/**
 * Badge Component - Reusable badge/tag
 * @param {Object} props
 * @param {React.ReactNode} props.children - Badge content
 * @param {string} props.variant - Badge style variant (primary, secondary, success, warning, danger)
 * @param {string} props.size - Badge size (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 */
const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'badge';
  
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  };

  const badgeClasses = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
