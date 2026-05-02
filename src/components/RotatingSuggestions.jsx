import React, { useState, useEffect } from 'react';
import SuggestionCard from './Suggestions';

const RotatingSuggestions = ({ suggestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (suggestions.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % suggestions.length);
        setIsTransitioning(false);
      }, 500); // Animation duration
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [suggestions.length]);

  if (!suggestions.length) return null;

  const currentSuggestion = suggestions[currentIndex];

  return (
    <div className="bg-white rounded-[28px] shadow-[0_24px_80px_-40px_rgba(15,23,42,0.18)] border border-gray-200 p-6 sticky top-24 min-h-fit overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recommendations</h2>
        <div className="flex gap-1.5">
          {suggestions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-700 transform-gpu ${
          isTransitioning ? 'opacity-0 scale-95 -translate-x-6' : 'opacity-100 scale-100 translate-x-0'
        }`}
      >
        <SuggestionCard suggestion={currentSuggestion} index={currentIndex} />
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center tracking-wide">
        Suggestion {currentIndex + 1} of {suggestions.length}
      </div>
    </div>
  );
};

export default RotatingSuggestions;
