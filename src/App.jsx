import React, { useEffect, useState } from 'react';
import MetricCard from './components/MetricsCard';
import InsightCard from './components/Insights';
import RotatingSuggestions from './components/RotatingSuggestions';
import MetricRotatingSuggestions from './components/MetricRotatingSuggestions';
import HomePage from './components/HomePage';
import TeamAnalytics from './components/TeamAnalytics';
import TeamInsights from './components/TeamInsights';
import { generateInsights, generateSuggestions } from './utils/interpretation';

// Sample metrics for each developer (you can extend this with real data)
const developerMetrics = {
  1: { leadTime: 5, cycleTime: 2, bugRate: 0.3, deployments: 2, prs: 8 },
  2: { leadTime: 3, cycleTime: 1.5, bugRate: 0.08, deployments: 3, prs: 10 },
  3: { leadTime: 6, cycleTime: 3, bugRate: 0.25, deployments: 2, prs: 6 },
  4: { leadTime: 4, cycleTime: 2.5, bugRate: 0.12, deployments: 4, prs: 9 },
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);
  const [pendingPage, setPendingPage] = useState(null);
  const [transitionStage, setTransitionStage] = useState('entered');

  // Load custom suggestions from localStorage
  const [userSuggestions, setUserSuggestions] = useState(() => {
    const saved = localStorage.getItem('customDeveloperSuggestions');
    return saved ? JSON.parse(saved) : {};
  });

  const handleAddSuggestion = (devId, metricId, text) => {
    setUserSuggestions((prev) => {
      const newState = { ...prev };
      if (!newState[devId]) newState[devId] = {};
      if (!newState[devId][metricId]) newState[devId][metricId] = [];
      newState[devId][metricId].push({
        icon: '👤',
        text: text,
      });
      localStorage.setItem('customDeveloperSuggestions', JSON.stringify(newState));
      return newState;
    });
  };

  const startPageTransition = (page) => {
    setPendingPage(page);
    setTransitionStage('exiting');
  };

  const handleSelectDeveloper = (developer) => {
    setSelectedDeveloper(developer);
    startPageTransition('dashboard');
  };

  const handleNavigate = (page) => {
    startPageTransition(page);
  };

  React.useEffect(() => {
    if (transitionStage === 'exiting' && pendingPage) {
      const timeout = setTimeout(() => {
        setCurrentPage(pendingPage);
        setPendingPage(null);
        setTransitionStage('entering');
      }, 240);
      return () => clearTimeout(timeout);
    }

    if (transitionStage === 'entering') {
      const timeout = setTimeout(() => {
        setTransitionStage('entered');
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, pendingPage]);

  const transitionClass =
    transitionStage === 'entered'
      ? 'opacity-100 translate-y-0'
      : transitionStage === 'exiting'
      ? 'opacity-0 -translate-y-4'
      : 'opacity-0 translate-y-4';

  const pageWrapperClasses = `transition-all duration-300 ease-out ${transitionClass}`;

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className={pageWrapperClasses}>
        <HomePage onSelectDeveloper={handleSelectDeveloper} onNavigateTo={handleNavigate} />
      </div>
    );
  }

  // Team Analytics Page
  if (currentPage === 'analytics') {
    return (
      <div className={pageWrapperClasses}>
        <TeamAnalytics onNavigateTo={handleNavigate} onSelectDeveloper={handleSelectDeveloper} />
      </div>
    );
  }

  // Team Insights Page
  if (currentPage === 'insights') {
    return (
      <div className={pageWrapperClasses}>
        <TeamInsights onNavigateTo={handleNavigate} />
      </div>
    );
  }

  // Dashboard Page - Individual Developer
  if (currentPage === 'dashboard' && selectedDeveloper) {
    const metrics = developerMetrics[selectedDeveloper.id];
    const insights = generateInsights(metrics);
    const suggestions = generateSuggestions(metrics, selectedDeveloper);
    const firstName = selectedDeveloper.name.split(' ')[0];

    const developerThemes = {
      1: {
        focus: 'backend service performance',
        review: 'API contract reviews',
        release: 'core service deployments',
      },
      2: {
        focus: 'frontend polish and UX flow',
        review: 'responsive UI checks',
        release: 'experience-led feature releases',
      },
      3: {
        focus: 'platform integration consistency',
        review: 'full-stack handoff alignment',
        release: 'platform stability deployments',
      },
      4: {
        focus: 'infrastructure reliability',
        review: 'deployment pipeline health',
        release: 'DevOps automation workflows',
      },
    };

    const theme = developerThemes[selectedDeveloper.id] || {
      focus: 'development flow',
      review: 'workflow reviews',
      release: 'release rhythm',
    };

    const metricSuggestions = {
      leadTime: [
        {
          icon: '⚡',
          text: metrics.leadTime > 5
            ? `${firstName} should tighten ${theme.review} to reduce lead time for ${theme.focus}.`
            : `${firstName} is on track. Keep lead time low by simplifying ${theme.release}.`,
        },
        {
          icon: '📦',
          text: `${firstName} can split work into smaller releases so ${theme.focus} stays predictable.`,
        },
        {
          icon: '🧭',
          text: `Align the next sprint with ${theme.release} goals to keep lead time stable.`,
        },
      ],
      cycleTime: [
        {
          icon: '🔁',
          text: metrics.cycleTime > 3
            ? `${firstName} should reduce cycle time by keeping ${theme.focus} iterations tightly scoped.`
            : `${firstName} is moving quickly. Preserve this pace by staying focused on ${theme.review}.`,
        },
        {
          icon: '💡',
          text: `Keep task boundaries clear around ${theme.focus} to avoid cycle time spikes.`,
        },
        {
          icon: '📚',
          text: `Use retrospectives to tune how ${theme.review} supports faster cycles.`,
        },
      ],
      bugRate: [
        {
          icon: '🧪',
          text: metrics.bugRate > 0.2
            ? `${firstName} should target ${theme.focus} with stronger validation tests.`
            : `${firstName} is doing well on bug prevention. Share your approach for ${theme.review}.`,
        },
        {
          icon: '🔍',
          text: `Review the most recent ${theme.focus} work to catch subtle issues early.`,
        },
        {
          icon: '📊',
          text: `Track defects by ${theme.focus} area and prioritize team improvements.`,
        },
      ],
      deployments: [
        {
          icon: '🚀',
          text: metrics.deployments < 3
            ? `${firstName} can boost velocity by automating ${theme.release}.`
            : `${firstName} is keeping ${theme.release} moving smoothly—continue this momentum.`,
        },
        {
          icon: '🔄',
          text: `Improve ${theme.release} quality by pairing deployments with targeted checks.`,
        },
        {
          icon: '🏁',
          text: `Use ${theme.release} planning to make each deployment more predictable.`,
        },
      ],
    };

    const getCombinedSuggestions = (metricId) => {
      const defaultSugg = metricSuggestions[metricId] || [];
      const customSugg = userSuggestions[selectedDeveloper.id]?.[metricId] || [];
      return [...defaultSugg, ...customSugg];
    };

    // Determine status colors for metrics
    const getMetricStatus = (metric, value) => {
      if (metric === 'leadTime') return value <= 3 ? 'good' : value <= 5 ? 'warning' : 'critical';
      if (metric === 'cycleTime') return value <= 2 ? 'good' : value <= 4 ? 'warning' : 'critical';
      if (metric === 'bugRate') return value <= 0.1 ? 'good' : value <= 0.2 ? 'warning' : 'critical';
      if (metric === 'deployments') return value >= 2 ? 'good' : 'warning';
      if (metric === 'prs') return value >= 5 ? 'good' : 'warning';
      return 'good';
    };

    return (
      <div className={pageWrapperClasses}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900">
          {/* Header with Navigation */}
          <div className="bg-gradient-to-r from-white/95 via-slate-100 to-sky-100 backdrop-blur-2xl border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <button
                    onClick={() => handleNavigate('home')}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors mb-2"
                  >
                    ← Back to Home
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedDeveloper.name}</h1>
                  <p className="text-sm text-gray-600">{selectedDeveloper.role} • Product: {selectedDeveloper.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-700">{selectedDeveloper.email}</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => handleNavigate('analytics')}
                  className="px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                >
                  📊 Analytics
                </button>
                <button
                  onClick={() => handleNavigate('insights')}
                  className="px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 font-medium transition-colors"
                >
                  💡 Insights
                </button>
              </div>
            </div>
          </div>

          <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Metrics Column */}
              <div className="lg:col-span-2">
                <div className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] backdrop-blur-xl ring-1 ring-slate-200/70">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Performance Snapshot</p>
                      <h2 className="text-3xl font-semibold text-slate-900">Developer Metrics</h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Live developer view
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <MetricCard
                      label="Lead Time"
                      value={`${metrics.leadTime}`}
                      unit="days"
                      status={getMetricStatus('leadTime', metrics.leadTime)}
                      icon="⏱️"
                    >
                      <MetricRotatingSuggestions 
                        suggestions={getCombinedSuggestions('leadTime')} 
                        onAddSuggestion={(text) => handleAddSuggestion(selectedDeveloper.id, 'leadTime', text)}
                      />
                    </MetricCard>
                    <MetricCard
                      label="Cycle Time"
                      value={`${metrics.cycleTime}`}
                      unit="days"
                      status={getMetricStatus('cycleTime', metrics.cycleTime)}
                      icon="🔄"
                    >
                      <MetricRotatingSuggestions 
                        suggestions={getCombinedSuggestions('cycleTime')} 
                        onAddSuggestion={(text) => handleAddSuggestion(selectedDeveloper.id, 'cycleTime', text)}
                      />
                    </MetricCard>
                    <MetricCard
                      label="Bug Rate"
                      value={`${(metrics.bugRate * 100).toFixed(1)}`}
                      unit="%"
                      status={getMetricStatus('bugRate', metrics.bugRate)}
                      icon="🐛"
                    >
                      <MetricRotatingSuggestions 
                        suggestions={getCombinedSuggestions('bugRate')} 
                        onAddSuggestion={(text) => handleAddSuggestion(selectedDeveloper.id, 'bugRate', text)}
                      />
                    </MetricCard>
                    <MetricCard
                      label="Deployments"
                      value={`${metrics.deployments}`}
                      unit="/week"
                      status={getMetricStatus('deployments', metrics.deployments)}
                      icon="🚀"
                    >
                      <MetricRotatingSuggestions 
                        suggestions={getCombinedSuggestions('deployments')} 
                        onAddSuggestion={(text) => handleAddSuggestion(selectedDeveloper.id, 'deployments', text)}
                      />
                    </MetricCard>
                  </div>
                </div>
              </div>

              {/* Insights and Suggestions Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <InsightCard key={index} insight={insight} />
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
                  <RotatingSuggestions suggestions={suggestions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // Fallback to home or a loading indicator if no page matches
  return (
    <div className={pageWrapperClasses}>
      <HomePage onSelectDeveloper={handleSelectDeveloper} onNavigateTo={handleNavigate} />
    </div>
  );
}

export default App;
