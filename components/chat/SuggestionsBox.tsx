import React from 'react';

interface SuggestionsBoxProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

export const SuggestionsBox: React.FC<SuggestionsBoxProps> = ({ suggestions, onSelectSuggestion }) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-gray-700 dark:text-gray-300 font-bold mb-2">Suggestions</h4>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectSuggestion(suggestion)}
              className="w-full text-left bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
