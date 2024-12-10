import React from 'react';

interface ClearChatProps {
  onClear: () => void;
}

export const ClearChat: React.FC<ClearChatProps> = ({ onClear }) => {
  return (
    <div className="flex justify-end p-4">
      <button
        onClick={onClear}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Clear Chat
      </button>
    </div>
  );
};
