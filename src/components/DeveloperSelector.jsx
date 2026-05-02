import React from 'react';
import sampleData from '../data/sampleData.json';

const DeveloperSelector = ({ onSelectDeveloper }) => {
  const cardStyles = [
    {
      card: 'bg-gradient-to-br from-sky-50 via-slate-50 to-white text-slate-900 border border-sky-100 shadow-[0_24px_60px_-30px_rgba(14,165,233,0.18)]',
      label: 'bg-sky-100/90 text-sky-700 border border-sky-200',
      detail: 'text-slate-900',
      accent: 'bg-white/80 border border-slate-200 text-slate-700',
    },
    {
      card: 'bg-gradient-to-br from-emerald-50 via-slate-50 to-white text-slate-900 border border-emerald-100 shadow-[0_24px_60px_-30px_rgba(16,185,129,0.18)]',
      label: 'bg-emerald-100/90 text-emerald-700 border border-emerald-200',
      detail: 'text-slate-900',
      accent: 'bg-white/80 border border-slate-200 text-slate-700',
    },
    {
      card: 'bg-gradient-to-br from-violet-50 via-slate-50 to-white text-slate-900 border border-violet-100 shadow-[0_24px_60px_-30px_rgba(168,85,247,0.18)]',
      label: 'bg-violet-100/90 text-violet-700 border border-violet-200',
      detail: 'text-slate-900',
      accent: 'bg-white/80 border border-slate-200 text-slate-700',
    },
    {
      card: 'bg-gradient-to-br from-amber-50 via-slate-50 to-white text-slate-900 border border-amber-100 shadow-[0_24px_60px_-30px_rgba(251,191,36,0.18)]',
      label: 'bg-amber-100/90 text-amber-800 border border-amber-200',
      detail: 'text-slate-900',
      accent: 'bg-white/80 border border-slate-200 text-slate-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {sampleData.developers.map((developer, index) => {
          const style = cardStyles[index % cardStyles.length];
          return (
            <button
              key={developer.id}
              onClick={() => onSelectDeveloper(developer)}
              className={`group w-full rounded-[28px] p-6 text-left transition-all duration-300 hover:-translate-y-1 ${style.card}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] ${style.label}`}>{developer.product}</div>
                  <h3 className="text-2xl font-semibold tracking-tight">{developer.name}</h3>
                  <p className="text-sm text-slate-600">{developer.role}</p>
                </div>
                <div className="mt-2 text-2xl text-slate-400 transition-colors duration-300 group-hover:text-slate-600">→</div>
              </div>
              <div className={`mt-5 rounded-3xl p-4 ${style.accent}`}>
                <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Team</p>
                <p className={`mt-2 text-sm font-medium ${style.detail}`}>{developer.team}</p>
                <p className={`mt-1 text-sm opacity-80 ${style.detail}`}>{developer.email}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeveloperSelector;
