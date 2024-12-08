import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-4 bg-white border-t border-gray-200"
    >
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <FaPaperPlane />
      </button>
    </form>
  );
};
