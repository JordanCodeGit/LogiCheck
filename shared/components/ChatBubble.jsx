import React from 'react';
import { MessageCircle, User } from 'lucide-react';

/**
 * ChatBubble Component - Reusable chat message bubble
 * @param {Object} props
 * @param {string} props.message - Message text
 * @param {boolean} props.isUser - Whether message is from user
 * @param {string} props.timestamp - Optional timestamp
 * @param {string} props.className - Additional CSS classes
 */
const ChatBubble = ({ message, isUser = false, timestamp, className = '' }) => {
  return (
    <div
      className={`flex items-start space-x-3 ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      } animate-fade-in ${className}`}
    >
      {/* Avatar */}
      <div
        className={`p-2 rounded-full flex-shrink-0 ${
          isUser ? 'bg-primary-100' : 'bg-secondary-100'
        }`}
      >
        {isUser ? (
          <User className={`w-5 h-5 ${isUser ? 'text-primary-600' : 'text-secondary-600'}`} />
        ) : (
          <MessageCircle className={`w-5 h-5 ${isUser ? 'text-primary-600' : 'text-secondary-600'}`} />
        )}
      </div>

      {/* Message */}
      <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl max-w-[80%] ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-sm'
              : 'bg-gray-100 text-gray-800 rounded-tl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message}</p>
        </div>
        {timestamp && (
          <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
