import React, { useState } from 'react';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import { ChatHistory } from './ChatHistory';
import { ClearChat } from './ClearChat';
import { VoiceInput } from './VoiceInput';
import { ThemeSelector } from './ThemeSelector';
import { TypingIndicator } from './TypingIndicator';
import { FileUpload } from './FileUpload';
import { SuggestionsBox } from './SuggestionsBox';
import { LanguageSelector } from './LanguageSelector';
import { ChatReaction } from './ChatReaction';
import { CustomPromptEditor } from './CustomPromptEditor';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; timestamp: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('English');
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
      setSuggestions(['What is AI?', 'How do you work?', 'Explain ChatGPT']);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <ThemeSelector onChangeTheme={(theme) => console.log(`Theme changed to ${theme}`)} />
      <LanguageSelector currentLanguage={language} onChangeLanguage={setLanguage} />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <Message key={index} sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
        ))}
        <TypingIndicator isTyping={isTyping} />
      </div>
      <SuggestionsBox suggestions={suggestions} onSelectSuggestion={handleSendMessage} />
      <div className="p-4 flex items-center justify-between bg-gray-200 dark:bg-gray-800">
        <VoiceInput onSend={handleSendMessage} />
        <ChatInput onSend={handleSendMessage} />
      </div>
      <ChatReaction onReact={(emoji) => console.log(`Reaction: ${emoji}`)} />
      <CustomPromptEditor onSendCustomPrompt={handleSendMessage} />
      <ChatHistory messages={messages} />
      <ClearChat onClear={() => setMessages([])} />
      <FileUpload onFileUpload={(file) => console.log('File uploaded:', file)} />
    </div>
  );
};
