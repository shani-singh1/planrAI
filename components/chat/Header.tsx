import React from 'react';
import { MoonIcon, SunIcon } from 'react-icons/all';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200">
        AI Chat
      </h1>
      <button
        onClick={onToggleDarkMode}
        className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5 text-yellow-500" />
        ) : (
          <MoonIcon className="h-5 w-5 text-gray-900" />
        )}
      </button>
    </header>
  );
};
