import React, { useMemo } from 'react';
import sampleData from '../data/sampleData.json';

const TeamAnalytics = ({ onNavigateTo, onSelectDeveloper }) => {
  const developerMetrics = {
    1: { leadTime: 5, cycleTime: 2, bugRate: 0.3, deployments: 2, prs: 8 },
    2: { leadTime: 3, cycleTime: 1.5, bugRate: 0.08, deployments: 3, prs: 10 },
    3: { leadTime: 6, cycleTime: 3, bugRate: 0.25, deployments: 2, prs: 6 },
    4: { leadTime: 4, cycleTime: 2.5, bugRate: 0.12, deployments: 4, prs: 9 },
  };

  const devData = useMemo(() => {
    return sampleData.developers.map((dev) => {
      const metrics = developerMetrics[dev.id];
      return {
        ...dev,
        ...metrics,
        productivity: Math.round(((1 - metrics.bugRate) * 100 + metrics.deployments * 10) / 2),
        quality: Math.round((1 - metrics.bugRate) * 100),
      };
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900">
      <div className="bg-gradient-to-r from-white/95 via-slate-100 to-sky-100 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Team analytics</p>
            <h1 className="text-3xl font-semibold text-slate-900">Team Analytics</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTo('home')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateTo('insights')}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Insights
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Performance Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Lead Time</h3>
                <div className="space-y-4">
                  {devData.map((dev) => (
                    <div key={dev.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 truncate">{dev.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${(dev.leadTime / 8) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{dev.leadTime}d</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Bug Rate</h3>
                <div className="space-y-4">
                  {devData.map((dev) => (
                    <div key={dev.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 truncate">{dev.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-red-500 h-2.5 rounded-full"
                            style={{ width: `${(dev.bugRate / 0.4) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{(dev.bugRate * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Deployments/Week</h3>
                <div className="space-y-4">
                  {devData.map((dev) => (
                    <div key={dev.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 truncate">{dev.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${(dev.deployments / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{dev.deployments}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
                <h3 className="font-semibold text-slate-900 mb-4">Productivity</h3>
                <div className="space-y-4">
                  {devData.map((dev) => (
                    <div key={dev.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 truncate">{dev.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${dev.productivity}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{dev.productivity}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <h2 className="text-3xl font-semibold text-slate-900 mb-6 text-center">Developer Profiles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devData.map((dev) => (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => onSelectDeveloper(dev)}
                  className="text-left bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">👨‍💻</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      dev.productivity >= 50
                        ? 'bg-green-100 text-green-800'
                        : dev.productivity >= 40
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {dev.productivity}%
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{dev.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dev.role}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Lead Time</span>
                      <span className="font-bold text-gray-800">{dev.leadTime}d</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Quality</span>
                      <span className="font-bold text-gray-800">{dev.quality}%</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Deployments</span>
                      <span className="font-bold text-gray-800">{dev.deployments}/w</span>
                    </div>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-blue-600 font-semibold transition-all group-hover:gap-2.5">
                    View Details →
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;
