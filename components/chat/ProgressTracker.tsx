import React from 'react';

interface ProgressTrackerProps {
  progress: number; // A value between 0 and 100
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <div className="p-4">
      <div className="relative w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-lg">
        <div
          className="absolute top-0 left-0 bg-blue-500 h-4 rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{progress}% Complete</p>
    </div>
  );
};
