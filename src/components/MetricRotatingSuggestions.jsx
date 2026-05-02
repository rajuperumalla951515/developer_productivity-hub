import React, { useState, useEffect } from 'react';

const MetricRotatingSuggestions = ({ suggestions, onAddSuggestion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [inputValue, setInputValue] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !onAddSuggestion) return;
    onAddSuggestion(inputValue);
    setInputValue('');
  };

  if (!suggestions || suggestions.length === 0) return null;

  const current = suggestions[currentIndex] || suggestions[0];

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
      <div className="mt-4 flex gap-1 mb-2">
        {suggestions.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'bg-blue-600 w-4' : 'bg-slate-300 w-2'
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 relative group">
        <div className="relative flex items-center rounded-2xl bg-white/50 border border-slate-200/60 transition-all duration-300 focus-within:bg-white focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-md hover:border-slate-300">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Suggest an actionable improvement..."
            className="w-full bg-transparent text-[13px] text-slate-700 placeholder-slate-400 py-2.5 pl-4 pr-12 outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-1 p-1.5 mr-0.5 rounded-[10px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 disabled:opacity-0 disabled:-translate-x-1"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default MetricRotatingSuggestions;
