import React, { useState } from 'react';

interface VoiceInputProps {
  onSend: (text: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onSend }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onSend(transcript);
    };
  };

  return (
    <button
      onClick={startListening}
      className={`p-2 rounded-full ${
        isListening ? 'bg-red-500' : 'bg-blue-500'
      } text-white hover:opacity-80`}
    >
      {isListening ? 'Listening...' : '🎤'}
    </button>
  );
};
