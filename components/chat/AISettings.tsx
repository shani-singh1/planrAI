import React from 'react';

interface AISettingsProps {
  creativity: number;
  speed: number;
  onCreativityChange: (value: number) => void;
  onSpeedChange: (value: number) => void;
}

export const AISettings: React.FC<AISettingsProps> = ({
  creativity,
  speed,
  onCreativityChange,
  onSpeedChange,
}) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-gray-700 dark:text-gray-300 font-bold mb-2">AI Settings</h4>
      <div className="mb-4">
        <label className="text-gray-600 dark:text-gray-400">Creativity:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={creativity}
          onChange={(e) => onCreativityChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <div>
        <label className="text-gray-600 dark:text-gray-400">Response Speed:</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};
