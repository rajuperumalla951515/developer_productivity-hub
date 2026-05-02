import React from 'react';

const SuggestionCard = ({ suggestion, index }) => {
  const { icon, text } = suggestion;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-[28px] p-5 border border-slate-200 shadow-[0_24px_80px_-45px_rgba(15,23,42,0.22)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 transform-gpu">
      <div className="flex items-start gap-4">
        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center text-2xl shadow-lg shadow-blue-200/50">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-2">Suggestion #{index + 1}</h4>
          <p className="text-sm text-slate-700 leading-7">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
