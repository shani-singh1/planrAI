import React from 'react';

interface SessionSummaryProps {
  summary: string;
  onRequestSummary: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ summary, onRequestSummary }) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-gray-700 dark:text-gray-300 font-bold mb-2">Session Summary</h4>
      {summary ? (
        <p className="text-gray-600 dark:text-gray-400">{summary}</p>
      ) : (
        <button
          onClick={onRequestSummary}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Generate Summary
        </button>
      )}
    </div>
  );
};
