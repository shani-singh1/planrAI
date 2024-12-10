import React from 'react';

interface ChatHistoryProps {
  messages: { sender: 'user' | 'ai'; text: string; timestamp: string }[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const handleDownloadHistory = () => {
    const data = messages.map(
      (msg) => `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.text}`
    ).join('\n');

    const blob = new Blob([data], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={handleDownloadHistory}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Download Chat History
      </button>
    </div>
  );
};
