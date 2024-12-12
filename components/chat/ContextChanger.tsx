import React from 'react';

interface ContextChangerProps {
  currentContext: string;
  onChangeContext: (context: string) => void;
}

const CONTEXT_OPTIONS = ['Formal', 'Casual', 'Technical', 'Creative'];

export const ContextChanger: React.FC<ContextChangerProps> = ({ currentContext, onChangeContext }) => {
  return (
    <div className="p-4 flex space-x-2 items-center">
      <label className="text-gray-700 dark:text-gray-300 font-bold">Context:</label>
      <select
        value={currentContext}
        onChange={(e) => onChangeContext(e.target.value)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {CONTEXT_OPTIONS.map((context) => (
          <option key={context} value={context}>
            {context}
          </option>
        ))}
      </select>
    </div>
  );
};
