import { useState, useEffect } from 'react';
import { Highlighter, Flame, Heart, Filter } from 'lucide-react';

/**
 * BiasHighlighter Component
 * Allows users to highlight text with different bias categories
 * Categories: Loaded Language, Emotional Appeals, Biased Framing
 */
const BiasHighlighter = ({ content, title, source, bias, side, onHighlightsChange, initialHighlights = [] }) => {
  const [highlights, setHighlights] = useState(initialHighlights);
  const [selectedCategory, setSelectedCategory] = useState('loaded'); // 'loaded', 'emotional', 'framing'
  const [selectedText, setSelectedText] = useState('');

  // Sync with initialHighlights when they change
  useEffect(() => {
    setHighlights(initialHighlights);
  }, [initialHighlights]);

  const categories = [
    {
      id: 'loaded',
      name: 'Loaded Language',
      icon: Flame,
      color: 'red',
      bgClass: 'bg-red-100',
      textClass: 'text-red-800',
      borderClass: 'border-red-500',
      description: 'Words with strong positive or negative connotations'
    },
    {
      id: 'emotional',
      name: 'Emotional Appeals',
      icon: Heart,
      color: 'orange',
      bgClass: 'bg-orange-100',
      textClass: 'text-orange-800',
      borderClass: 'border-orange-500',
      description: 'Appeals to emotion rather than logic'
    },
    {
      id: 'framing',
      name: 'Biased Framing',
      icon: Filter,
      color: 'purple',
      bgClass: 'bg-purple-100',
      textClass: 'text-purple-800',
      borderClass: 'border-purple-500',
      description: 'Selective presentation or perspective'
    }
  ];

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0) {
      setSelectedText(text);
    }
  };

  const handleAddHighlight = () => {
    if (selectedText) {
      const newHighlight = {
        id: Date.now(),
        text: selectedText,
        category: selectedCategory,
        side: side
      };
      
      const updatedHighlights = [...highlights, newHighlight];
      setHighlights(updatedHighlights);
      
      // Notify parent component
      if (onHighlightsChange) {
        onHighlightsChange(updatedHighlights);
      }
      
      setSelectedText('');
      window.getSelection().removeAllRanges();
    }
  };

  const handleRemoveHighlight = (id) => {
    const updatedHighlights = highlights.filter(h => h.id !== id);
    setHighlights(updatedHighlights);
    
    // Notify parent component
    if (onHighlightsChange) {
      onHighlightsChange(updatedHighlights);
    }
  };

  const getHighlightedContent = () => {
    let highlightedContent = content;
    
    // Sort highlights by text length (longest first) to avoid nested replacement issues
    const sortedHighlights = [...highlights].sort((a, b) => b.text.length - a.text.length);
    
    sortedHighlights.forEach((highlight) => {
      const category = categories.find(c => c.id === highlight.category);
      const highlightClass = `${category.bgClass} ${category.textClass} px-1 rounded font-medium cursor-pointer hover:opacity-80`;
      
      // Use a more specific replacement to avoid partial matches
      const regex = new RegExp(`(${highlight.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlightedContent = highlightedContent.replace(
        regex,
        `<mark class="${highlightClass}" data-highlight-id="${highlight.id}">$1</mark>`
      );
    });
    
    return highlightedContent;
  };

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="flex flex-col h-full">
      {/* Article Header */}
      <div className={`p-4 border-b-2 ${side === 'A' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'} transition-colors`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-bold text-lg ${side === 'A' ? 'text-blue-900 dark:text-blue-300' : 'text-orange-900 dark:text-orange-300'}`}>
            Article {side}
          </h3>
          <span className={`text-xs px-2 py-1 rounded ${side === 'A' ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' : 'bg-orange-200 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200'}`}>
            {bias}
          </span>
        </div>
        <p className={`text-sm font-semibold ${side === 'A' ? 'text-blue-800 dark:text-blue-300' : 'text-orange-800 dark:text-orange-300'}`}>
          {title}
        </p>
        <p className={`text-xs ${side === 'A' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
          Source: {source}
        </p>
      </div>

      {/* Highlighting Tools */}
      <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 transition-colors">
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 flex items-center">
          <Highlighter className="w-3 h-3 mr-1" />
          Select text, choose category, then click "Add Highlight"
        </p>
        
        {/* Category Selector */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-2 rounded-lg border-2 transition-all text-xs ${
                  selectedCategory === category.id
                    ? `${category.borderClass} ${category.bgClass} ${category.textClass}`
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <Icon className="w-3 h-3" />
                  <span className="font-medium">{category.name.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Add Highlight Button */}
        {selectedText && (
          <button
            onClick={handleAddHighlight}
            className={`w-full py-2 px-3 rounded-lg ${currentCategory.bgClass} ${currentCategory.textClass} font-medium text-sm transition-all hover:opacity-80`}
          >
            Add as {currentCategory.name}
          </button>
        )}
      </div>

      {/* Article Content */}
      <div
        className="flex-1 p-4 overflow-y-auto text-sm leading-relaxed select-text text-gray-900 dark:text-gray-100 transition-colors"
        onMouseUp={handleTextSelection}
        dangerouslySetInnerHTML={{ __html: getHighlightedContent() }}
      />

      {/* Highlights Summary */}
      {highlights.length > 0 && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-700 max-h-40 overflow-y-auto transition-colors">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Highlights ({highlights.length})
          </p>
          <div className="space-y-1">
            {highlights.map((highlight) => {
              const category = categories.find(c => c.id === highlight.category);
              return (
                <div
                  key={highlight.id}
                  className={`flex items-start justify-between p-2 rounded ${category.bgClass} dark:opacity-80`}
                >
                  <div className="flex-1">
                    <p className={`text-xs font-medium ${category.textClass}`}>
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-200 line-clamp-1">
                      "{highlight.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveHighlight(highlight.id)}
                    className="ml-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-xs"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasHighlighter;
