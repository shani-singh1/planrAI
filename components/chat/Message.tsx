import React from 'react';

interface MessageProps {
  sender: 'user' | 'ai';
  text: string;
}

export const Message: React.FC<MessageProps> = ({ sender, text }) => {
  const isUser = sender === 'user';
  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } items-start space-x-2`}
    >
      {!isUser && (
        <div className="bg-gray-300 text-gray-700 rounded-full h-8 w-8 flex items-center justify-center font-bold">
          AI
        </div>
      )}
      <div
        className={`${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        } p-3 rounded-lg max-w-xs shadow-md`}
      >
        {text}
      </div>
    </div>
  );
};
