import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

/**
 * Alert Component - Reusable alert/notification
 * @param {Object} props
 * @param {string} props.type - Alert type (info, success, warning, error)
 * @param {string} props.title - Alert title
 * @param {string} props.message - Alert message
 * @param {boolean} props.dismissible - Show close button
 * @param {Function} props.onDismiss - Dismiss handler
 * @param {string} props.className - Additional CSS classes
 */
const Alert = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const typeConfig = {
    info: {
      baseClass: 'alert-info',
      icon: Info,
      iconColor: 'text-primary-600',
    },
    success: {
      baseClass: 'alert-success',
      icon: CheckCircle,
      iconColor: 'text-success-600',
    },
    warning: {
      baseClass: 'alert-warning',
      icon: AlertCircle,
      iconColor: 'text-warning-600',
    },
    error: {
      baseClass: 'alert-error',
      icon: XCircle,
      iconColor: 'text-accent-600',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div className={`alert ${config.baseClass} ${className} animate-slide-down`}>
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          {message && (
            <p className="text-sm">{message}</p>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 hover:bg-black hover:bg-opacity-10 rounded transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
