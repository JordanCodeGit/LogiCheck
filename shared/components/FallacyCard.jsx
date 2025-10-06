import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Card from './Card';

/**
 * FallacyCard Component - Display a logical fallacy with quote and explanation
 * @param {Object} props
 * @param {Object} props.fallacy - Fallacy data
 * @param {string} props.fallacy.fallacyName - Name of the fallacy
 * @param {string} props.fallacy.quote - Quote from text showing the fallacy
 * @param {string} props.fallacy.explanation - Explanation of the fallacy
 * @param {string} props.className - Additional CSS classes
 */
const FallacyCard = ({ fallacy, className = '' }) => {
  return (
    <Card
      variant="hover"
      className={`border-l-4 border-l-red-500 ${className} animate-fade-in`}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg flex-shrink-0 transition-colors">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Fallacy Name */}
          <h3 className="font-semibold text-lg text-red-700 dark:text-red-400 mb-2">
            {fallacy.fallacyName}
          </h3>

          {/* Quote */}
          {fallacy.quote && (
            <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-700 dark:text-gray-300 mb-3 bg-gray-50 dark:bg-gray-800/50 py-2 rounded transition-colors">
              "{fallacy.quote}"
            </blockquote>
          )}

          {/* Explanation */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {fallacy.explanation}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FallacyCard;
