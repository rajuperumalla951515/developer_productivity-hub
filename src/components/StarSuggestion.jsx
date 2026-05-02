import React from 'react';

const StarSuggestion = ({ suggestion }) => {
  return (
    <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg">
      <span className="font-bold text-lg">⭐</span>
      <p className="font-medium">{suggestion}</p>
    </div>
  );
};

export default StarSuggestion;
