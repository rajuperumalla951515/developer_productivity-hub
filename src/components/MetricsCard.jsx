import React from 'react';

const MetricCard = ({ label, value, unit, status, icon, children }) => {
  const statusColors = {
    good: 'text-emerald-600',
    warning: 'text-amber-600',
    critical: 'text-red-600',
  };

  const statusBgColors = {
    good: 'bg-emerald-50 border-emerald-200',
    warning: 'bg-amber-50 border-amber-200',
    critical: 'bg-red-50 border-red-200',
  };

  return (
    <div className={`rounded-[28px] border p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.25)] ${statusBgColors[status] || 'bg-white border-slate-200'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl shadow-sm">{icon}</div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</div>
              <div className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusBgColors[status] || 'bg-slate-100 text-slate-700'}`}>
                <span className={`h-2.5 w-2.5 rounded-full ${statusColors[status] || 'bg-slate-400'}`} />
                <span className="capitalize text-slate-700">{status}</span>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-3">
            <span className={`text-4xl font-semibold ${statusColors[status] || 'text-slate-900'}`}>{value}</span>
            <span className="pb-1 text-sm font-medium text-slate-500">{unit}</span>
          </div>
        </div>
      </div>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
};

export default MetricCard;
