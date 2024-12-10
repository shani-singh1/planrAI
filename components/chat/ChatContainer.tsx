import React, { useState } from 'react';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import { ChatHistory } from './ChatHistory';
import { ClearChat } from './ClearChat';
import { VoiceInput } from './VoiceInput';
import { ThemeSelector } from './ThemeSelector';
import { TypingIndicator } from './TypingIndicator';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; timestamp: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setMessages((prev) => [...prev, { sender: 'user', text, timestamp }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "I'm here to assist you!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1500);
  };

  const handleClearMessages = () => setMessages([]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <ThemeSelector onChangeTheme={(theme) => console.log(`Theme changed to ${theme}`)} />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
        ))}
        <TypingIndicator isTyping={isTyping} />
      </div>
      <div className="p-4 flex items-center justify-between bg-gray-200 dark:bg-gray-800">
        <VoiceInput onSend={handleSendMessage} />
        <ChatInput onSend={handleSendMessage} />
      </div>
      <ChatHistory messages={messages} />
      <ClearChat onClear={handleClearMessages} />
    </div>
  );
};
