import React from 'react';
import { ChatInput } from './ChatInput';
import { Message } from './Message';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = React.useState<
    { sender: 'user' | 'ai'; text: string }[]
  >([
    { sender: 'ai', text: 'Hello! How can I assist you today?' },
  ]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { sender: 'user', text }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "I'm here to help with any queries you have!" },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
