import React, { useState } from "react";

// Helper Component for guidance or tips
const Helper: React.FC<{ tips: string[] }> = ({ tips }) => {
  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        Need Help? Try Saying:
      </h2>
      <ul className="list-disc list-inside text-gray-600">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

// Main VoiceChat Component
const VoiceChat: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [aiResponse, setAiResponse] = useState("Hello! How can I help you?");
  const tips = [
    "What's the weather like today?",
    "Tell me about artificial intelligence.",
    "Schedule a meeting for tomorrow.",
    "Recommend a book about technology.",
  ];

  const handleMicrophoneClick = () => {
    setListening((prev) => !prev);
    if (!listening) {
      console.log("Listening...");
    } else {
      console.log("Stopped listening.");
      setAiResponse("I heard you say: 'Tell me about AI!'");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Talk with AI
        </h1>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-600 h-32 flex items-center justify-center">
          <p>{aiResponse}</p>
        </div>
        <button
          onClick={handleMicrophoneClick}
          className={`mt-6 w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-colors duration-300 ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-blue-500 text-white"
          }`}
          aria-label="Toggle Microphone"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-8 h-8"
          >
            {listening ? (
              <path d="M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3zm-1 18.93a9.2 9.2 0 01-7-8.93h2a7.2 7.2 0 0014 0h2a9.2 9.2 0 01-7 8.93V23h-4v-3.07z" />
            ) : (
              <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3zM4 11a1 1 0 00-1 1v1a9 9 0 0018 0v-1a1 1 0 00-2 0v1a7 7 0 01-14 0v-1a1 1 0 00-1-1z" />
            )}
          </svg>
        </button>
        <p className="text-sm text-gray-500 text-center mt-4">
          {listening
            ? "Listening... Speak now!"
            : "Press the microphone to start talking"}
        </p>
        <Helper tips={tips} />
      </div>
    </div>
  );
};

export default VoiceChat;
