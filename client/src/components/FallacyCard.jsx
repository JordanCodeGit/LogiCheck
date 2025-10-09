import { AlertTriangle } from 'lucide-react';

const FallacyCard = ({ fallacy }) => {
  return (
    <div className="card border-l-4 border-l-red-500 hover:shadow-lg transition-shadow animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-red-700 dark:text-red-400 mb-2">
            {fallacy.fallacyName}
          </h3>
          {fallacy.quote && (
            <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 mb-3 bg-gray-50 dark:bg-gray-700/50 py-2 rounded">
              "{fallacy.quote}"
            </blockquote>
          )}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {fallacy.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FallacyCard;
