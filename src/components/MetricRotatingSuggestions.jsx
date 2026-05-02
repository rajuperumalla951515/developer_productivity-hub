import React, { useState, useEffect } from 'react';

const MetricRotatingSuggestions = ({ suggestions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!suggestions || suggestions.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % suggestions.length);
        setIsTransitioning(false);
      }, 320);

      return () => clearTimeout(timeout);
    }, 5000);

    return () => clearInterval(interval);
  }, [suggestions]);

  if (!suggestions || suggestions.length === 0) return null;

  const current = suggestions[currentIndex];

  return (
    <div className="mt-4 rounded-[28px] border border-slate-200 bg-slate-50/95 p-4 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.35)] transition-all duration-500">
      <div
        className={`overflow-hidden rounded-2xl transition-all duration-500 ${
          isTransitioning ? 'opacity-60' : 'opacity-100'
        }`}
      >
        <div
          className={`flex items-start gap-3 transform transition-all duration-500 ease-out ${
            isTransitioning ? 'translate-y-3 scale-[0.98]' : 'translate-y-0 scale-100'
          }`}
        >
          <div className="text-xl">{current.icon}</div>
          <p className="text-sm text-slate-700 flex-1 leading-6">{current.text}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1">
        {suggestions.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-blue-600 w-4' : 'bg-slate-300 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricRotatingSuggestions;
