import React from 'react';

interface MultiLanguageSupportProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Hindi'];

export const MultiLanguageSupport: React.FC<MultiLanguageSupportProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="p-4 flex items-center space-x-2">
      <label className="text-gray-700 dark:text-gray-300 font-bold">Language:</label>
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};
