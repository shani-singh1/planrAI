import React from 'react';

interface ThemeSelectorProps {
  onChangeTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onChangeTheme }) => {
  return (
    <div className="flex justify-end p-4 space-x-2">
      <button
        onClick={() => onChangeTheme('light')}
        className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300"
      >
        Light
      </button>
      <button
        onClick={() => onChangeTheme('dark')}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700"
      >
        Dark
      </button>
      <button
        onClick={() => onChangeTheme('system')}
        className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600"
      >
        System
      </button>
    </div>
  );
};
