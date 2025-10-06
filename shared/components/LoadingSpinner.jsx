import React from 'react';

/**
 * LoadingSpinner Component - Reusable loading indicator
 * @param {Object} props
 * @param {string} props.size - Spinner size (sm, md, lg)
 * @param {string} props.color - Spinner color (primary, secondary, white)
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Show as full screen overlay
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  text = '',
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  const colorClasses = {
    primary: 'border-primary-600 border-r-transparent',
    secondary: 'border-secondary-600 border-r-transparent',
    white: 'border-white border-r-transparent',
    accent: 'border-accent-600 border-r-transparent',
  };

  const spinnerClasses = [
    'spinner',
    sizeClasses[size] || sizeClasses.md,
    colorClasses[color] || colorClasses.primary,
    className,
  ].filter(Boolean).join(' ');

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={spinnerClasses} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 animate-fade-in">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
