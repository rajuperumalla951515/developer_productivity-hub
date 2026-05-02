import React, { useState, useMemo } from 'react';
import DeveloperSelector from './DeveloperSelector';
import sampleData from '../data/sampleData.json';

const HomePage = ({ onSelectDeveloper, onNavigateTo }) => {
  // Calculate team statistics
  const teamStats = useMemo(() => {
    const devCount = sampleData.developers.length;
    const avgLeadTime = (5 + 3 + 6 + 4) / devCount;
    const avgBugRate = (0.3 + 0.08 + 0.25 + 0.12) / devCount;
    const totalDeployments = 2 + 3 + 2 + 4;
    const totalPRs = 8 + 10 + 6 + 9;
    
    return {
      devCount,
      avgLeadTime: avgLeadTime.toFixed(1),
      avgBugRate: (avgBugRate * 100).toFixed(1),
      totalDeployments,
      totalPRs,
      teamHealth: ((100 - avgBugRate * 100) * 0.7 + (totalDeployments / devCount) * 10).toFixed(0),
    };
  }, []);

  const StatCard = ({ icon, label, value, unit, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      amber: 'bg-amber-50 text-amber-600 border-amber-200',
    };

    return (
      <div className={`${colorClasses[color]} rounded-xl border p-6 backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
        <div className="text-3xl mb-2">{icon}</div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">{label}</p>
        <p className="text-4xl font-bold">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{unit}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900">
      <div className="bg-gradient-to-r from-white/95 via-slate-100 to-sky-100 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Developer Productivity</p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">High-impact engineering insights for modern teams</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTo('analytics')}
              className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Team Analytics
            </button>
            <button
              onClick={() => onNavigateTo('insights')}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Team Insights
            </button>
          </div>
        </div>
      </div>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Focused MVP for engineering leaders</p>
                <h2 className="text-4xl sm:text-5xl font-semibold text-slate-900 leading-tight">Turn developer metrics into confident product decisions.</h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">Review performance, understand product ownership, and surface recommendations that your team can act on immediately.</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigateTo('analytics')}
                    className="rounded-full bg-gradient-to-r from-slate-900 to-indigo-700 px-6 py-3 text-sm font-semibold text-white transition hover:from-slate-800 hover:to-indigo-600"
                  >
                    Explore Analytics
                  </button>
                  <button
                    onClick={() => onNavigateTo('insights')}
                    className="rounded-full border border-slate-300 bg-gradient-to-r from-white to-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:from-slate-50 hover:to-slate-100"
                  >
                    View Insights
                  </button>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Team pulse</p>
                  <div className="mt-4 space-y-4 text-sm text-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span>Active developers</span>
                      <span className="font-semibold">{teamStats.devCount}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span>Avg lead time</span>
                      <span className="font-semibold">{teamStats.avgLeadTime} days</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <span>Avg bug rate</span>
                      <span className="font-semibold">{teamStats.avgBugRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Deployments</span>
                      <span className="font-semibold">{teamStats.totalDeployments}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-md">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Health score</p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold text-slate-900">{teamStats.teamHealth}%</p>
                      <p className="text-sm text-slate-500 mt-1">Composite quality & delivery index</p>
                    </div>
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-600 text-white grid place-items-center shadow-lg">
                      <span className="text-2xl font-semibold">A</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
            <div className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 via-sky-50 to-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-100">
              <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Team workflow</p>
                <h3 className="text-3xl font-semibold text-slate-900">Choose a developer to view their product metrics</h3>
                <p className="mt-3 text-slate-600">Each developer is mapped to a product domain so you can quickly understand ownership and impact.</p>
              </div>
              <div className="rounded-[28px] bg-gradient-to-br from-white via-slate-100 to-sky-50 p-6 shadow-sm ring-1 ring-slate-200">
                <DeveloperSelector onSelectDeveloper={onSelectDeveloper} />
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.1)]">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Product ownership</p>
                <h4 className="mt-4 text-xl font-semibold text-slate-900">What each developer owns</h4>
                <ul className="mt-6 space-y-4 text-slate-600">
                  {sampleData.developers.map((dev) => (
                    <li key={dev.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="font-semibold text-slate-900">{dev.name}</p>
                      <p className="text-sm text-slate-500">{dev.product}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[32px] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Premium insight</p>
                <h4 className="mt-4 text-xl font-semibold">Built for fast decisions</h4>
                <p className="mt-3 text-slate-300 leading-7">This MVP is designed to surface the most relevant developer signals without noise: product alignment, quality, throughput, and deployment readiness.</p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
