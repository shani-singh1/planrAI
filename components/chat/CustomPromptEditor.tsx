import React, { useState } from 'react';

interface CustomPromptEditorProps {
  onSendCustomPrompt: (prompt: string) => void;
}

export const CustomPromptEditor: React.FC<CustomPromptEditorProps> = ({ onSendCustomPrompt }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleSend = () => {
    if (customPrompt.trim()) {
      onSendCustomPrompt(customPrompt.trim());
      setCustomPrompt('');
    }
  };

  return (
    <div className="p-4">
      <textarea
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
        placeholder="Write your custom prompt here..."
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        rows={3}
      />
      <button
        onClick={handleSend}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Send Prompt
      </button>
    </div>
  );
};
