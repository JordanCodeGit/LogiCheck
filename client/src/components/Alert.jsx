import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const styles = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: XCircle,
      iconColor: 'text-red-500 dark:text-red-400',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: CheckCircle,
      iconColor: 'text-green-500 dark:text-green-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: AlertCircle,
      iconColor: 'text-yellow-500 dark:text-yellow-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: Info,
      iconColor: 'text-blue-500 dark:text-blue-400',
    },
  };

  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border ${config.text} px-4 py-3 rounded-lg flex items-start space-x-3 animate-fade-in transition-colors`}>
      <Icon className={`${config.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <XCircle className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
