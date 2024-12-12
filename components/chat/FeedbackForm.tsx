import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmitFeedback: (feedback: string) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitFeedback }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmitFeedback(feedback.trim());
      setFeedback('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-gray-700 dark:text-gray-300 font-bold mb-2">Your Feedback</h4>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
        rows={3}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Submit Feedback
      </button>
    </div>
  );
};
