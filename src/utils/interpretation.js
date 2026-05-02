// Utility functions to generate insights based on metrics
export const generateInsights = (metrics) => {
  const insights = [];
  const { leadTime, cycleTime, bugRate, deployments, prs } = metrics;

  // Insight 1: Lead Time vs Cycle Time Analysis
  if (leadTime > cycleTime && leadTime > 3) {
    insights.push({
      title: "Review Bottleneck Detected",
      description: `High lead time (${leadTime} days) compared to cycle time (${cycleTime} days) suggests delays in code review or deployment processes.`,
      severity: "warning",
    });
  } else if (leadTime <= cycleTime) {
    insights.push({
      title: "Efficient Development Pipeline",
      description: `Your lead time (${leadTime} days) is well-aligned with cycle time (${cycleTime} days), indicating a smooth development workflow.`,
      severity: "success",
    });
  }

  // Insight 2: Bug Rate Analysis
  if (bugRate > 0.2) {
    insights.push({
      title: "Quality Attention Required",
      description: `Bug rate of ${(bugRate * 100).toFixed(1)}% is above industry standards. Consider increasing test coverage or code review rigor.`,
      severity: "critical",
    });
  } else if (bugRate < 0.1) {
    insights.push({
      title: "High Code Quality",
      description: `Bug rate of ${(bugRate * 100).toFixed(1)}% demonstrates excellent code quality. Keep maintaining your standards.`,
      severity: "success",
    });
  }

  // Insight 3: Deployment Frequency vs PR Throughput
  if (prs > 0 && deployments < prs / 4) {
    insights.push({
      title: "Deployment Lag",
      description: `You have ${prs} PRs but only ${deployments} deployments. Consider increasing deployment frequency to get features to production faster.`,
      severity: "warning",
    });
  } else if (deployments >= prs / 2) {
    insights.push({
      title: "Strong Deployment Cadence",
      description: `With ${deployments} deployments for ${prs} PRs, you maintain a healthy release cycle.`,
      severity: "success",
    });
  }

  return insights;
};

// Generate actionable suggestions based on insights and metrics
export const generateSuggestions = (metrics, developer) => {
  const suggestions = [];
  const { leadTime, cycleTime, bugRate, deployments, prs } = metrics;

  const developerContext = {
    1: {
      prefix: 'backend service',
      strength: 'API reliability',
      strategy: 'microservice deployment cadence',
    },
    2: {
      prefix: 'frontend experience',
      strength: 'UI responsiveness',
      strategy: 'responsive design flow',
    },
    3: {
      prefix: 'platform engineering',
      strength: 'integration stability',
      strategy: 'full-stack delivery cadence',
    },
    4: {
      prefix: 'DevOps operations',
      strength: 'pipeline automation',
      strategy: 'deployment reliability',
    },
  };

  const context = developerContext[developer?.id] || {
    prefix: 'development',
    strength: 'team delivery',
    strategy: 'release rhythm',
  };

  if (leadTime > 5) {
    suggestions.push({
      icon: '⚡',
      text: `Improve ${context.prefix} lead time by focusing on smaller batch sizes and clearer handoff expectations.`,
    });
    suggestions.push({
      icon: '📦',
      text: `Break ${context.prefix} work into smaller increments so ${context.strategy} becomes more predictable.`,
    });
    suggestions.push({
      icon: '⌛',
      text: `Shorten the review window for ${context.prefix} changes to keep lead time under control.`,
    });
  } else if (leadTime > 3) {
    suggestions.push({
      icon: '🎯',
      text: `Strong ${context.prefix} delivery time. Keep the momentum by documenting decisions around ${context.strength}.`,
    });
  }

  if (bugRate > 0.25) {
    suggestions.push({
      icon: '🧪',
      text: `Add more targeted tests around ${context.prefix} components to reduce bug volume.`,
    });
    suggestions.push({
      icon: '🔍',
      text: `Review recent ${context.prefix} changes for common failure modes and fix them before release.`,
    });
    suggestions.push({
      icon: '📊',
      text: `Track ${context.prefix} defect trends and apply fixes at the component level.`,
    });
  } else if (bugRate > 0.15) {
    suggestions.push({
      icon: '🧪',
      text: `Improve ${context.prefix} test coverage, especially around the areas that impact ${context.strength}.`,
    });
    suggestions.push({
      icon: '📈',
      text: `Use incremental quality checks in the ${context.prefix} workflow to catch glitches earlier.`,
    });
  } else if (bugRate < 0.1) {
    suggestions.push({
      icon: '✨',
      text: `Excellent ${context.prefix} quality. Share what you're doing to keep ${context.strength} high.`,
    });
    suggestions.push({
      icon: '📚',
      text: `Mentor teammates on ${context.prefix} best practices and testing habits.`,
    });
  }

  if (deployments < prs / 5) {
    suggestions.push({
      icon: '🚀',
      text: `Increase ${context.strategy} by automating more of the release process.`,
    });
    suggestions.push({
      icon: '🔄',
      text: `Use feature flags to decouple ${context.prefix} releases from deployment timing.`,
    });
  } else if (deployments < prs / 3) {
    suggestions.push({
      icon: '⬆️',
      text: `Target a stronger deployment cadence for ${context.prefix} work.`,
    });
  } else if (deployments >= prs / 2) {
    suggestions.push({
      icon: '🏆',
      text: `Great ${context.strategy}! Keep that pace while maintaining ${context.strength}.`,
    });
  }

  if (cycleTime > 3) {
    suggestions.push({
      icon: '⏱️',
      text: `Split ${context.prefix} work into smaller batches to reduce cycle time.`,
    });
  } else {
    suggestions.push({
      icon: '💪',
      text: `Fast cycle time is a strong signal. Keep the flow steady with ${context.prefix} guardrails.`,
    });
  }

  if (prs < 5) {
    suggestions.push({
      icon: '📝',
      text: `Consider increasing PR throughput for ${context.prefix} work to improve predictability.`,
    });
  } else if (prs >= 8) {
    suggestions.push({
      icon: '🎖️',
      text: `High PR throughput for ${context.prefix}. Focus on quality as speed scales.`,
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      icon: '⭐',
      text: `Maintain your ${context.prefix} approach, and keep the team aligned around ${context.strategy}.`,
    });
  }

  return suggestions.slice(0, 3);
};
