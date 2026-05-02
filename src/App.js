import React, { useState } from 'react';
import MetricsCard from './components/MetricsCard';
import Insights from './components/Insights';
import Suggestions from './components/Suggestions';
import { getInterpretation } from './utils/interpretation';
import sampleData from './data/sampleData.json';
import './App.css';

function App() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(1);

  const developer = sampleData.developers.find((d) => d.id === selectedDeveloper);
  const developerIssues = sampleData.issues.filter((i) => i.developerId === selectedDeveloper);
  const developerPRs = sampleData.prs.filter((p) => p.developerId === selectedDeveloper);
  const developerDeployments = sampleData.deployments.filter((d) => developerPRs.some((p) => p.id === d.prId));

  // Sample metrics calculation
  const metrics = {
    leadTimeForChanges: 5,
    cycleTime: 3,
    bugRate: 0.05,
  };

  const interpretations = getInterpretation(metrics);
  const suggestions = [
    "Continue maintaining your current code quality standards",
    "Consider pairing with team members for knowledge sharing",
    "Document complex implementations for future reference",
  ];

  return (
    <div className="app">
      <header className="app-header">
        <h1>Developer Performance Metrics</h1>
      </header>

      <main className="app-main">
        <section className="developer-selector">
          <h2>Select Developer</h2>
          <select value={selectedDeveloper} onChange={(e) => setSelectedDeveloper(Number(e.target.value))}>
            {sampleData.developers.map((dev) => (
              <option key={dev.id} value={dev.id}>
                {dev.name} - {dev.role}
              </option>
            ))}
          </select>
          {developer && (
            <div className="developer-info">
              <p>
                <strong>Name:</strong> {developer.name}
              </p>
              <p>
                <strong>Role:</strong> {developer.role}
              </p>
              <p>
                <strong>Team:</strong> {developer.team}
              </p>
            </div>
          )}
        </section>

        <section className="metrics-section">
          <h2>Performance Metrics</h2>
          <div className="metrics-grid">
            <MetricsCard title="Completed Issues" value={developerIssues.length} unit="issues" />
            <MetricsCard title="Merged PRs" value={developerPRs.length} unit="PRs" />
            <MetricsCard
              title="Successful Deployments"
              value={developerDeployments.length}
              unit="deployments"
            />
            <MetricsCard
              title="Lead Time for Changes"
              value={metrics.leadTimeForChanges}
              unit="days"
            />
          </div>
        </section>

        <section className="insights-section">
          <Insights insights={interpretations} />
        </section>

        <section className="suggestions-section">
          <Suggestions suggestions={suggestions} />
        </section>
      </main>
    </div>
  );
}

export default App;
