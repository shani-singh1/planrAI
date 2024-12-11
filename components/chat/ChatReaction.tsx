import React from 'react';

interface ChatReactionProps {
  onReact: (emoji: string) => void;
}

const EMOJIS = ['👍', '👎', '😂', '😮', '❤️'];

export const ChatReaction: React.FC<ChatReactionProps> = ({ onReact }) => {
  return (
    <div className="flex space-x-2 p-4">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => onReact(emoji)}
          className="text-xl hover:scale-110 transition-transform focus:outline-none"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
