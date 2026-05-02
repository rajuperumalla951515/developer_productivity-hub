import React, { useMemo } from 'react';
import sampleData from '../data/sampleData.json';

const TeamInsights = ({ onNavigateTo }) => {
  const developerMetrics = {
    1: { leadTime: 5, cycleTime: 2, bugRate: 0.3, deployments: 2, prs: 8 },
    2: { leadTime: 3, cycleTime: 1.5, bugRate: 0.08, deployments: 3, prs: 10 },
    3: { leadTime: 6, cycleTime: 3, bugRate: 0.25, deployments: 2, prs: 6 },
    4: { leadTime: 4, cycleTime: 2.5, bugRate: 0.12, deployments: 4, prs: 9 },
  };

  const insights = useMemo(() => {
    const devData = sampleData.developers.map((dev) => {
      const metrics = developerMetrics[dev.id];
      return { ...dev, ...metrics };
    });

    return {
      topPerformer: devData.reduce((a, b) => {
        const scoreA = (1 - a.bugRate) * 100 + a.deployments * 10;
        const scoreB = (1 - b.bugRate) * 100 + b.deployments * 10;
        return scoreA > scoreB ? a : b;
      }),
      needsSupport: devData.filter((d) => d.bugRate > 0.2 || d.leadTime > 5),
      deploymentLeaders: devData.sort((a, b) => b.deployments - a.deployments).slice(0, 2),
      qualityLeaders: devData.sort((a, b) => a.bugRate - b.bugRate).slice(0, 2),
      avgLeadTime: (devData.reduce((sum, d) => sum + d.leadTime, 0) / devData.length).toFixed(1),
      avgBugRate: (devData.reduce((sum, d) => sum + d.bugRate, 0) / devData.length * 100).toFixed(1),
    };
  }, []);

  const InsightCard = ({ icon, title, description, children }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-white/95 via-slate-100 to-sky-100 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Team insights</p>
            <h1 className="text-3xl font-semibold text-slate-900">Team Insights & Recommendations</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTo('home')}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => onNavigateTo('analytics')}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Key Findings */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl font-bold mb-2">{insights.avgLeadTime}</div>
                <p className="text-blue-100 text-sm">Average Lead Time (days)</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl font-bold mb-2">{insights.avgBugRate}%</div>
                <p className="text-green-100 text-sm">Average Bug Rate</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl font-bold mb-2">{insights.topPerformer.name.split(' ')[0]}</div>
                <p className="text-purple-100 text-sm">Top Performer</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
                <div className="text-4xl font-bold mb-2">{insights.needsSupport.length}</div>
                <p className="text-amber-100 text-sm">Need Attention</p>
              </div>
            </div>
          </div>

          {/* Deep Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InsightCard
              icon="⭐"
              title="Top Performer"
              description={`${insights.topPerformer.name} is leading the team with strong metrics across all areas.`}
            >
              <div className="bg-blue-50 rounded-lg p-4 space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Lead Time</span>
                  <span className="font-bold text-gray-900">{insights.topPerformer.leadTime} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Bug Rate</span>
                  <span className="font-bold text-gray-900">{(insights.topPerformer.bugRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Deployments/Week</span>
                  <span className="font-bold text-gray-900">{insights.topPerformer.deployments}</span>
                </div>
              </div>
            </InsightCard>

            <InsightCard
              icon="🎯"
              title="Quality Leaders"
              description="Developers maintaining the lowest bug rates in the team."
            >
              <div className="space-y-3 mt-4">
                {insights.qualityLeaders.map((dev) => (
                  <div key={dev.id} className="bg-green-50 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-gray-900 font-medium">{dev.name}</span>
                    <span className="text-green-700 font-bold text-lg">{(dev.bugRate * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </InsightCard>

            <InsightCard
              icon="🚀"
              title="Deployment Champions"
              description="Leading the team in deployment frequency and velocity."
            >
              <div className="space-y-3 mt-4">
                {insights.deploymentLeaders.map((dev) => (
                  <div key={dev.id} className="bg-indigo-50 rounded-lg p-3 flex justify-between items-center">
                    <span className="text-gray-900 font-medium">{dev.name}</span>
                    <span className="text-indigo-700 font-bold text-lg">{dev.deployments}/week</span>
                  </div>
                ))}
              </div>
            </InsightCard>

            <InsightCard
              icon="⚠️"
              title="Support Needed"
              description="Developers who could benefit from mentoring or process improvements."
            >
              <div className="space-y-3 mt-4">
                {insights.needsSupport.length > 0 ? (
                  insights.needsSupport.map((dev) => (
                    <div key={dev.id} className="bg-amber-50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-900 font-medium">{dev.name}</span>
                      </div>
                      <div className="text-xs text-amber-800 font-semibold">
                        {dev.bugRate > 0.2 && `Bug Rate: ${(dev.bugRate * 100).toFixed(1)}% `}
                        {dev.leadTime > 5 && `Lead Time: ${dev.leadTime}d`}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">Great! All team members are performing well.</p>
                )}
              </div>
            </InsightCard>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Strategic Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📚</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Knowledge Sharing</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Organize code review sessions with {insights.topPerformer.name} as a mentor to improve team quality standards.
                    </p>
                    <div className="bg-white rounded-full px-4 py-2 text-xs font-bold text-blue-700 inline-block shadow-sm">
                      Priority: High
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Deployment Acceleration</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Increase deployment frequency across the team. Current average: {insights.deploymentLeaders[0].deployments}/week.
                    </p>
                    <div className="bg-white rounded-full px-4 py-2 text-xs font-bold text-green-700 inline-block shadow-sm">
                      Priority: Medium
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🔍</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Quality Improvement</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Target: Reduce team bug rate to &lt;10%. Implement automated testing for critical paths.
                    </p>
                    <div className="bg-white rounded-full px-4 py-2 text-xs font-bold text-purple-700 inline-block shadow-sm">
                      Priority: High
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🎓</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Process Optimization</h3>
                    <p className="text-gray-700 text-sm mb-4">
                      Focus on reducing lead time by streamlining review processes. Current avg: {insights.avgLeadTime} days.
                    </p>
                    <div className="bg-white rounded-full px-4 py-2 text-xs font-bold text-amber-700 inline-block shadow-sm">
                      Priority: Medium
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInsights;
