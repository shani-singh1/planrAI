import React from 'react';

interface TypingIndicatorProps {
  isTyping: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isTyping }) => {
  if (!isTyping) return null;

  return (
    <div className="flex items-center space-x-2 mt-2">
      <div className="bg-gray-300 h-2 w-2 rounded-full animate-pulse"></div>
      <div className="bg-gray-300 h-2 w-2 rounded-full animate-pulse delay-75"></div>
      <div className="bg-gray-300 h-2 w-2 rounded-full animate-pulse delay-150"></div>
      <span className="text-gray-500 text-sm italic">AI is typing...</span>
    </div>
  );
};
