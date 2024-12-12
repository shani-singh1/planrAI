import React from 'react';

interface QuickAccessShortcutsProps {
  onClearChat: () => void;
  onToggleTheme: () => void;
  onUploadFile: () => void;
}

export const QuickAccessShortcuts: React.FC<QuickAccessShortcutsProps> = ({
  onClearChat,
  onToggleTheme,
  onUploadFile,
}) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
      <button
        onClick={onClearChat}
        className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600"
      >
        Clear Chat
      </button>
      <button
        onClick={onToggleTheme}
        className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-600"
      >
        Toggle Theme
      </button>
      <button
        onClick={onUploadFile}
        className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600"
      >
        Upload File
      </button>
    </div>
  );
};
